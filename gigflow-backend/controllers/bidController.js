const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== 'open') {
      return res.status(400).json({ message: 'Gig not available for bidding' });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot bid on your own gig' });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
      status: 'pending'
    });

    await bid.populate('freelancerId', 'name email');
    res.status(201).json(bid);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already bid on this gig' });
    }
    res.status(500).json({ message: error.message });
  }
};

const getGigBids = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const bid = await Bid.findById(req.params.bidId).session(session);
      if (!bid) {
        throw new Error('Bid not found');
      }

      const gig = await Gig.findById(bid.gigId).session(session);
      if (!gig) {
        throw new Error('Gig not found');
      }

      if (gig.ownerId.toString() !== req.user._id.toString()) {
        throw new Error('Not authorized');
      }

      if (gig.status !== 'open') {
        throw new Error('Gig is no longer available');
      }

      // Update bid status to hired
      await Bid.findByIdAndUpdate(
        req.params.bidId,
        { status: 'hired' },
        { session }
      );

      // Reject all other bids for this gig
      await Bid.updateMany(
        { gigId: bid.gigId, _id: { $ne: req.params.bidId } },
        { status: 'rejected' },
        { session }
      );

      // Update gig status to assigned
      await Gig.findByIdAndUpdate(
        bid.gigId,
        { status: 'assigned' },
        { session }
      );

      // Send real-time notification
      const io = req.app.get('io');
      if (io) {
        io.to(bid.freelancerId.toString()).emit('notification', {
          type: 'hired',
          message: `You have been hired for ${gig.title}!`,
          gigId: gig._id,
          gigTitle: gig.title
        });
      }
    });

    const updatedBid = await Bid.findById(req.params.bidId)
      .populate('freelancerId', 'name email');

    res.json({ message: 'Freelancer hired successfully', bid: updatedBid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    await session.endSession();
  }
};

const rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    const gig = await Gig.findById(bid.gig);
    if (gig.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Bid.findByIdAndUpdate(req.params.bidId, { status: 'rejected' });
    res.json({ message: 'Bid rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancer: req.user._id })
      .populate('gig', 'title budget status client')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBid,
  getGigBids,
  hireBid
};
const Gig = require('../models/Gig');
const Bid = require('../models/Bid');

const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id
    });
    
    await gig.populate('ownerId', 'name email');
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGigs = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = { status: 'open' };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const gigs = await Gig.find(filter)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('client', 'name email')
      .populate('hiredFreelancer', 'name email');
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('client', 'name email');

    res.json(updatedGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Gig.findByIdAndDelete(req.params.id);
    await Bid.deleteMany({ gig: req.params.id });

    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGig,
  getGigs,
  getGig,
  updateGig,
  deleteGig,
  getMyGigs
};
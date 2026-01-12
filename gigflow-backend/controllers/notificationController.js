const Notification = require('../models/Notification');

const createNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
    const io = require('../server').io;
    if (io) {
      io.to(data.recipient.toString()).emit('notification', notification);
    }
    return notification;
  } catch (error) {
    console.error('Notification error:', error);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNotification, getNotifications, markAsRead };
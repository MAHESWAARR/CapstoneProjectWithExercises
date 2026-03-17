const Notification = require("../models/Notification");


// GET USER NOTIFICATIONS
exports.getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      count: notifications.length,
      notifications
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};



// MARK AS READ
exports.markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};
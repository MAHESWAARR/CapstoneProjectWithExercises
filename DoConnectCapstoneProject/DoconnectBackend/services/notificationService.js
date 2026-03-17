const Notification = require("../models/Notification");

const createNotification = async ({ userId, type, message, referenceId }) => {

  try {

    const notification = await Notification.create({
      userId,
      type,
      message,
      referenceId
    });

    return notification;

  } catch (error) {
    console.error("Notification error:", error);
  }

};

module.exports = {
  createNotification
};
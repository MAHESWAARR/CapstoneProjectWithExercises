const Chat = require("../models/Chat");

const saveMessage = async ({ senderId, receiverId, message }) => {

  const chat = await Chat.create({
    senderId,
    receiverId,
    message
  });

  return chat;

};

module.exports = { saveMessage };
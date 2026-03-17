const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Declaring Routes
const authRoutes = require('./routes/authRoutes')
const protect = require("./middleware/authMiddleware")
const { saveMessage } = require("./services/chatService");
const { createNotification } = require("./services/notificationService");
const adminRoutes = require('./routes/adminRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/answers" , answerRoutes)
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorHandler);
app.use("/api/users" , userRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("DoConnect API Running");
});

app.get("/api/protected" , protect, (req, res) => {
  res.json({
    message : "You accessed a protected Route",
    user : req.user
  });
});





const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Port
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV !== "test"){
  server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
}

module.exports = server;


io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {

    const { senderId, receiverId, message , seen } = data;

    const newMessage = await saveMessage({
      senderId,
      receiverId,
      message,
      seen
    });

    io.emit("receiveMessage", newMessage);
    await createNotification({
    userId: receiverId,
    type: "CHAT",
    message: "You received a new message",
    referenceId: newMessage._id
  });
  });
  


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //Notification Emit
  socket.on("sendNotification", (notification) => {

    io.emit("receiveNotification", notification);

  });
});



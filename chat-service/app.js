const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://tarunv1911:ea0cj8dzRV2NhFmT@cluster0.70deyvr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected"));

// Message schema
const messageSchema = new mongoose.Schema({
  roomId: String,
  from: String,
  to: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const app = express();
app.use(cors());

app.get("/api/messages/sent/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const sent = await Message.find({ from: userId }).distinct("to");
    res.json(sent);
  } catch (err) {
    console.error("Error fetching sent messages:", err);
    res.status(500).json({ error: "Failed to fetch sent users." });
  }
});

app.get("/api/messages/received/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const received = await Message.find({ to: userId }).distinct("from");
    res.json(received);
  } catch (err) {
    console.error("Error fetching received messages:", err);
    res.status(500).json({ error: "Failed to fetch inbox users." });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Mapping userId -> socketId
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`Registered: user ${userId} -> socket ${socket.id}`);
  });

  socket.on("join_room", async ({ from, to }) => {
    const roomId = generateRoomId(from, to);
    socket.join(roomId);
    console.log(`${from} joined room ${roomId}`);

    const toSocketId = userSocketMap[to];
    if (toSocketId) {
      const toSocket = io.sockets.sockets.get(toSocketId);
      if (toSocket) {
        toSocket.join(roomId);
        console.log(`${to} also joined room ${roomId}`);
      }
    }

    // Load previous messages for the room and send to the user who joined
    try {
      const messages = await Message.find({ roomId })
        .sort({ timestamp: 1 })
        .limit(100);
      socket.emit("previous_messages", messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  });

  socket.on("send_private_message", async ({ from, to, message }) => {
    const roomId = generateRoomId(from, to);

    // Save message to MongoDB
    try {
      const newMessage = new Message({ roomId, from, to, message });
      await newMessage.save();
      console.log("Message saved:", newMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }

    io.to(roomId).emit("receive_private_message", { from, message });
  });

  socket.on("disconnect", () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        console.log(`User disconnected: ${userId}`);
      }
    }
  });
});

function generateRoomId(id1, id2) {
  return `chat:${[id1, id2].sort().join("-")}`;
}

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.listen(3002, () => {
  console.log("App running on port 3002");
});

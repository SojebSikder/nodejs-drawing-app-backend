const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle drawing start
  socket.on("drawStart", (data) => {
    socket.broadcast.emit("drawStart", data); // Notify others when drawing starts
  });

  // Handle drawing movement
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data); // Send draw data to all other clients
  });

  // Handle drawing stop (optional)
  socket.on("drawEnd", () => {
    socket.broadcast.emit("drawEnd"); // Notify when drawing stops
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Serve static files (optional)
app.use(express.static("public"));

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

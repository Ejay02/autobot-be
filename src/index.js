const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const autobotRoutes = require("./routes/autobotRoutes");
const autobotService = require("./services/autobotService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5555;

// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
    credentials: true,
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.emit("welcome", { message: "Welcome to the real-time server!" });
});

app.use(express.json());
app.use("/api", autobotRoutes);

app.get("/", (req, res) => {
  res.send("TweetAI Backend");
});

// Initialize the autobotService with the io instance
autobotService.init(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

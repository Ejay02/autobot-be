const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const autobotRoutes = require("./routes/autobotRoutes");
// const db = require("../../config/dbConfig");

require("dotenv").config();
const PORT = process.env.PORT || 5555;

require("./services/autobotService");

app.use(express.json());
app.use("/api", autobotRoutes);

const server = http.createServer(app);
const io = socketIo(server);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  socket.emit("welcome", { message: "Welcome to the real-time server!" });
});

app.get("/", (req, res) => {
  res.send("TweetAI Backend");
});

// Export the server instance
module.exports = { server, io };

// Start the server only if this file is run directly
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

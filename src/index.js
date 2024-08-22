const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const PORT = process.env.PORT || 5000;
const autobotRoutes = require("./routes/autobotRoutes");
// const db = require("../../config/dbConfig");

require("dotenv").config();
require("./services/autobotService");

app.use(express.json());
app.use("/api", autobotRoutes);

app.get("/", (req, res) => {
  res.send("TweetAI Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

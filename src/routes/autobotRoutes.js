const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const autobotController = require("../controllers/autobotController");

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests /m
  message:
    "Whoa, you're really testing our limits! Take a deep breath and try again later... or just take a nap, we won't judge. :)",
});

router.use(limiter);

// Create a new Autobot
// router.post("/autobots", autobotController.createAutobot);

// Get all Autobots
router.get("/autobots", autobotController.getAllAutobots);

// Get a specific Autobot by ID
router.get("/autobots/:id", autobotController.getAutobotById);

// Get posts by a specific Autobot ID
router.get("/autobots/:id/posts", autobotController.getPostsByAutobotId);

// Get comments by a specific Post ID
router.get("/posts/:postId/comments", autobotController.getCommentsByPostId);

module.exports = router;

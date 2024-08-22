const Autobot = require("../models/autobot");
const Post = require("../models/post");
const Comment = require("../models/comment");

// Create a new Autobot (including posts and comments)
const createAutobot = async (req, res) => {
  try {
    const autobotData = req.body;
    Autobot.create(autobotData, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const autobotId = result.insertId;
      res.status(201).json({ message: "Autobot created", autobotId });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Autobots (with pagination)
const getAllAutobots = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const autobots = await Autobot.getAll(limit, offset);
    res.status(200).json(autobots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Autobot by ID
const getAutobotById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const autobot = await Autobot.getById(id);
    if (!autobot) {
      return res.status(404).json({ message: "Autobot not found" });
    }
    res.status(200).json(autobot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get posts by a specific Autobot ID (with pagination)
const getPostsByAutobotId = async (req, res) => {
  const autobotId = parseInt(req.params.id);
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const posts = await Post.getByAutobotId(autobotId, limit, offset);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments by a specific Post ID (with pagination)
const getCommentsByPostId = async (req, res) => {
  const postId = parseInt(req.params.postId);
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const comments = await Comment.getByPostId(postId, limit, offset);
    res.status(200).json(comments);
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Get the total count of Autobots
const getAutobotCount = async (req, res) => {
  try {
    const count = await Autobot.getCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAutobot,
  getAllAutobots,
  getAutobotById,
  getPostsByAutobotId,
  getCommentsByPostId,
  getAutobotCount,
};

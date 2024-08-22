const mysql = require("mysql2/promise");
const dbConfig = require("../../config/dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

const Comment = {
  // create a new Comment
  create: async (comment) => {
    const query =
      "INSERT INTO comments (postId, name, body, email) VALUES (?, ?, ?, ?)";
    const values = [comment.postId, comment.name, comment.body, comment.email];
    const [result] = await pool.execute(query, values);
    return result;
  },

  // retrieve all Comments (with pagination)
  getAll: async (limit, offset) => {
    const query =
      "SELECT * FROM comments ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [limit, offset]);
    return results;
  },

  // retrieve a specific Comment by ID
  getById: async (id) => {
    const query = "SELECT * FROM comments WHERE id = ?";
    const [results] = await pool.query(query, [id]);
    return results[0];
  },

  // retrieve comments by a specific Post ID (with pagination)
  getByPostId: async (postId, limit, offset) => {
    const query =
      "SELECT * FROM comments WHERE postId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [postId, limit, offset]);
    return results;
  },

  // get the count of all Comments for a specific Post
  getCountByPostId: async (postId) => {
    const query = "SELECT COUNT(*) AS count FROM comments WHERE postId = ?";
    const [results] = await pool.query(query, [postId]);
    return results[0].count;
  },

  // get the count of all Comments (for general purposes)
  getCount: async () => {
    const query = "SELECT COUNT(*) AS count FROM comments";
    const [results] = await pool.query(query);
    return results[0].count;
  },
};

module.exports = Comment;

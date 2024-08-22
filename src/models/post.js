const mysql = require("mysql2/promise");
const dbConfig = require("../../config/dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

const Post = {
  // Method to create a new Post
  create: async (post) => {
    const query = "INSERT INTO posts (autobotId, title, body) VALUES (?, ?, ?)";
    const values = [post.autobotId, post.title, post.body];
    const [result] = await pool.execute(query, values);
    return result;
  },

  // Method to retrieve all Posts (with pagination)
  getAll: async (limit, offset) => {
    const query = "SELECT * FROM posts LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [limit, offset]);
    return results;
  },

  // Method to retrieve a specific Post by ID
  getById: async (id) => {
    const query = "SELECT * FROM posts WHERE id = ?";
    const [results] = await pool.query(query, [id]);
    return results[0]; // Return the first result
  },

  // Method to retrieve posts by a specific Autobot ID (with pagination)
  getByAutobotId: async (autobotId, limit, offset) => {
    const query = "SELECT * FROM posts WHERE autobotId = ? LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [autobotId, limit, offset]);
    return results;
  },

  // Method to get the count of all Posts for a specific Autobot
  getCountByAutobotId: async (autobotId) => {
    const query = "SELECT COUNT(*) AS count FROM posts WHERE autobotId = ?";
    const [results] = await pool.query(query, [autobotId]);
    return results[0].count; // Return the count
  },

  // Method to get the count of all Posts (for general purposes)
  getCount: async () => {
    const query = "SELECT COUNT(*) AS count FROM posts";
    const [results] = await pool.query(query);
    return results[0].count; // Return the count
  },
};

module.exports = Post;

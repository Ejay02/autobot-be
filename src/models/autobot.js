const mysql = require("mysql2/promise");
const dbConfig = require("../../config/dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

const Autobot = {
  // create a new Autobot
  create: async ({
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  }) => {
    const query = `
      INSERT INTO autobots (name, username, email, address, phone, website, company) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name,
      username,
      email,
      JSON.stringify(address),
      phone,
      website,
      JSON.stringify(company),
    ];

    try {
      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        console.log(`Skipping duplicate entry for username: ${username}`);
        return null; // Return null or any other value to indicate a duplicate was encountered
      }
      throw error; // Rethrow other errors for handling in the calling function
    }
  },

  // retrieve all Autobots (with pagination)
  getAll: async (limit, offset) => {
    const query =
      "SELECT * FROM autobots ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [limit, offset]);
    return results;
  },

  // retrieve a specific Autobot by ID
  getById: async (id) => {
    const query = "SELECT * FROM autobots WHERE id = ?";
    const [results] = await pool.query(query, [id]);
    return results[0]; // Return the first result
  },

  // retrieve posts by a specific Autobot ID (with pagination /sort)
  getPostsByAutobotId: async (autobotId, limit, offset) => {
    const query =
      "SELECT * FROM posts WHERE autobotId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [autobotId, limit, offset]);
    return results;
  },

  // retrieve comments by a specific post ID (with pagination)
  getCommentsByPostId: async (postId, limit, offset) => {
    const query =
      "SELECT * FROM comments WHERE postId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [postId, limit, offset]);
    return results;
  },

  // get the count of all Autobots (for UI display)
  getCount: async () => {
    const query = "SELECT COUNT(*) AS count FROM autobots";
    const [results] = await pool.query(query);
    return results[0].count; // Return the count
  },
};

module.exports = Autobot;

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
    let uniqueName = name;
    let uniqueUsername = username;
    let uniqueEmail = email;

    const generateRandomString = () => crypto.randomBytes(3).toString("hex");

    const query = `
    INSERT INTO autobots (name, username, email, address, phone, website, company)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    while (true) {
      try {
        const values = [
          uniqueName,
          uniqueUsername,
          uniqueEmail,
          JSON.stringify(address),
          phone,
          website,
          JSON.stringify(company),
        ];

        const [result] = await pool.execute(query, values);
        return result;
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          console.log(`Duplicate entry encountered. Appending random string.`);
          const randomString = generateRandomString();
          uniqueName = `${name}_${randomString}`;
          uniqueUsername = `${username}_${randomString}`;
          uniqueEmail = `${email.split("@")[0]}_${randomString}@${
            email.split("@")[1]
          }`;
          // Continue the loop to try inserting with the new unique values
        } else {
          throw error;
        }
      }
    }
  },

  // retrieve all Autobots (with pagination)
  getAll: async (limit, offset) => {
    if (limit === undefined || offset === undefined) {
      // Fetch all records if limit or offset is not provided
      const query = "SELECT * FROM autobots ORDER BY created_at DESC";
      const [results] = await pool.query(query);
      return results;
    } else {
      const query =
        "SELECT * FROM autobots ORDER BY created_at DESC LIMIT ? OFFSET ?";
      const [results] = await pool.query(query, [limit, offset]);
      return results;
    }
  },

  // retrieve a specific Autobot by ID
  getById: async (id) => {
    const query = "SELECT * FROM autobots WHERE id = ?";
    const [results] = await pool.query(query, [id]);
    return results[0];
  },

  // retrieve posts by a specific Autobot ID
  getPostsByAutobotId: async (autobotId, limit, offset) => {
    const query =
      "SELECT * FROM posts WHERE autobotId = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [autobotId, limit, offset]);
    return results;
  },

  // retrieve comments by a specific post ID
  getCommentsByPostId: async (postId, limit, offset) => {
    const query =
      "SELECT * FROM comments WHERE postId = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
    const [results] = await pool.query(query, [postId, limit, offset]);
    return results;
  },

  // get the count of all Autobots (for UI display)
  getCount: async () => {
    const query = "SELECT COUNT(*) AS count FROM autobots";
    const [results] = await pool.query(query);
    return results[0].count;
  },
};

module.exports = Autobot;

const axios = require("axios");
const Autobot = require("../models/autobot");
const Post = require("../models/post");
const Comment = require("../models/comment");
const fs = require("fs");
const cron = require("node-cron");

const createAutobots = async () => {
  try {
    // Fetch user data
    const userResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = userResponse.data;

    // Fetch post data
    const postResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = postResponse.data;

    // Fetch comment data
    const commentResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const comments = commentResponse.data;

    const usedPostTitles = new Set(); // Set to track used post titles

    for (let i = 0; i < 500; i++) {
      const user = users[i % users.length]; // Loop through users

      const autobot = await Autobot.create({
        name: user.name,
        username: user.username,
        email: user.email,
        address: JSON.stringify(user.address),
        phone: user.phone,
        website: user.website,
        company: JSON.stringify(user.company),
      });

      // Create 10 unique posts for the created Autobot
      for (let j = 0; j < 10; j++) {
        let postTitle = `${user.username}'s Post ${j + 1}`; // Base title
        let uniqueTitle = postTitle;

        // Ensure the title is unique
        let counter = 1;
        while (usedPostTitles.has(uniqueTitle)) {
          uniqueTitle = `${postTitle} (Duplicate ${counter++})`; // Modify title to make it unique
        }

        usedPostTitles.add(uniqueTitle); // Add the unique title to the set

        const post = {
          autobotId: autobot.insertId,
          title: uniqueTitle,
          body: `This is the body of ${uniqueTitle}.`, // Customizable body
        };

        const postResult = await Post.create(post);

        // Create 10 comments for each post
        for (let k = 0; k < 10; k++) {
          const comment = {
            postId: postResult.insertId,
            name: comments[k % comments.length].name,
            body: comments[k % comments.length].body,
            email: comments[k % comments.length].email,
          };

          await Comment.create(comment);
        }
      }
    }
    // console.log("Process completed, now exiting gracefully.");
    fs.appendFileSync(
      "log.txt",
      "Process completed, now exiting gracefully.\n"
    );
    process.exit();
  } catch (error) {
    throw new Error(`Error creating Autobots: ${error.message}`);
    process.exit(1);
  }
};

// Schedule the Autobot creation process to run every hour
// cron.schedule("0 * * * *", () => {

cron.schedule("*/10 * * * *", async () => {
  //10 minute
  console.log("now Running the Autobot creation process every 10m...");
  await createAutobots();
});

module.exports = { createAutobots };

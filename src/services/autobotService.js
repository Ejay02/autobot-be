const axios = require("axios");
const Autobot = require("../models/autobot");
const Post = require("../models/post");
const Comment = require("../models/comment");
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

    const usedAutobotNames = new Set();
    const usedPostTitles = new Set();

    let userIndex = 0;
    let postIndex = 0;
    let commentIndex = 0;

    for (let i = 0; i < 500; i++) {
      // Use existing user data if available, otherwise generate
      const user =
        userIndex < users.length ? users[userIndex++] : generateUser(i);

      let autobotName = user.name;
      let uniqueAutobotName = autobotName;
      let autobotCounter = 1;

      // Ensure the Autobot name is unique
      while (usedAutobotNames.has(uniqueAutobotName)) {
        uniqueAutobotName = `${autobotName} (Clone ${autobotCounter++})`;
      }
      usedAutobotNames.add(uniqueAutobotName);

      const autobot = await Autobot.create({
        name: uniqueAutobotName,
        username: user.username,
        email: user.email,
        address: JSON.stringify(user.address),
        phone: user.phone,
        website: user.website,
        company: JSON.stringify(user.company),
      });

      // Create 10 unique posts for the created Autobot
      for (let j = 0; j < 10; j++) {
        // Use existing post data if available, otherwise generate
        const post =
          postIndex < posts.length
            ? posts[postIndex++]
            : generatePost(uniqueAutobotName, j);

        let postTitle = `${uniqueAutobotName}'s Post: ${post.title}`;
        let uniqueTitle = postTitle;

        // Ensure the title is unique
        let counter = 1;
        while (usedPostTitles.has(uniqueTitle)) {
          uniqueTitle = `${postTitle} (Duplicate ${counter++})`;
        }
        usedPostTitles.add(uniqueTitle);

        const postData = {
          autobotId: autobot.insertId,
          title: uniqueTitle,
          body: post.body,
        };

        const postResult = await Post.create(postData);

        // Create 10 comments for each post
        for (let k = 0; k < 10; k++) {
          // Use existing comment data if available, otherwise generate
          const comment =
            commentIndex < comments.length
              ? comments[commentIndex++]
              : generateComment(uniqueTitle, k);

          await Comment.create({
            postId: postResult.insertId,
            name: comment.name,
            body: comment.body,
            email: comment.email,
          });
        }
      }
    }

    console.log("Process completed, now exiting gracefully.");

    process.exit();
  } catch (error) {
    throw new Error(`Error creating Autobots: ${error.message}`);
  }
};

// Helper functions to generate data when API data is exhausted
function generateUser(index) {
  return {
    name: `Generated User ${index}`,
    username: `user${index}`,
    email: `user${index}@example.com`,
    address: { street: "Generated Street", city: "Generated City" },
    phone: "000-000-0000",
    website: `www.user${index}.com`,
    company: { name: "Generated Company" },
  };
}

function generatePost(autobotName, index) {
  return {
    title: `Generated Post ${index}`,
    body: `This is a generated post body for ${autobotName}.`,
  };
}

function generateComment(postTitle, index) {
  return {
    name: `Generated Commenter ${index}`,
    body: `This is a generated comment for ${postTitle}.`,
    email: `commenter${index}@example.com`,
  };
}

// Schedule the Autobot creation process to run every hour
// cron.schedule("0 * * * *", async () => {
cron.schedule("*/10 * * * *", async () => {
  console.info(
    "Autobots, roll out! (every 1 hour, because even robots need a break)"
  );
  // await createAutobots();
});

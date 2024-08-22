const cron = require("node-cron");
const { createAutobots } = require("../src/services/autobotService");

// Schedule the Autobot creation process to run every hour
// cron.schedule("0 * * * *", () => {

cron.schedule("*/5 * * * *", () => {
  //5m test

  console.log("Running the Autobot creation process...");
  // createAutobots();
});

console.log("Cron job is set up.");

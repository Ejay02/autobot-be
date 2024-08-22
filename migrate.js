const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig);

const runMigrations = async () => {
  try {
    await db.migrate.latest(); // Runs all pending migrations
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    await db.destroy(); // Close the database connection
  }
};

runMigrations();

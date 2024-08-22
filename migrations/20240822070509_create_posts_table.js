/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("body").notNullable();
    table
      .integer("autobotId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("autobots")
      .onDelete("CASCADE") // If an Autobot is deleted, the posts are also deleted
      .onUpdate("CASCADE"); // If an Autobot's ID is updated, the posts will also be updated
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("posts");
};

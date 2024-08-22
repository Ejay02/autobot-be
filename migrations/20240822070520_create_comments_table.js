/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("body").notNullable();
    table.string("email").notNullable();
    table
      .integer("postId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("comments");
};

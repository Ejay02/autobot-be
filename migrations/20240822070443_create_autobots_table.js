/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("autobots", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.text("address");
    table.string("phone");
    table.string("website");
    table.text("company");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("autobots");
};

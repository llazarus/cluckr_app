
exports.up = function(knex, Promise) {
  return knex.schema.createTable("clucks", table => {
    table.increments("id");
    table.string("username");
    table.string("image_url");
    table.text("content");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    // "updated_at" column will remain empty as instructions don't specify adding the ability to update or destroy entries
    table.timestamp("updated_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clucks");
};

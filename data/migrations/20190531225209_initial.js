//implement changes
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl.string('description', 128).notNullable();

    tbl.timestamps(true,true);

    tbl.boolean("completed").defaultTo(false);
  });
};
//undo changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};

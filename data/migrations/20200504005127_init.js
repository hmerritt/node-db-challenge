
exports.up = function(knex) {
  return knex.schema
    .createTable("projects", (table) => {
        table.increments();
        table.text("name").unique().notNullable();
        table.text("description");
        table.boolean("completed").defaultTo(false);
    })
    .createTable("tasks", (table) => {
        table.increments();
        table.text("description").notNullable();
        table.text("notes");
        table.boolean("completed").defaultTo(false);
        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("projects.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
    .createTable("resources", (table) => {
        table.increments();
        table.text("name").unique().notNullable();
        table.text("description");
    })
    .createTable("projects_resources", (table) => {
        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("projects.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table
            .integer("resource_id")
            .unsigned()
            .notNullable()
            .references("resources.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("projects")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects_resources");
};

exports.seed = function (knex) {
    return knex("projects").insert([
        { id: 1, name: "project_one" },
        { id: 2, name: "project_two" },
        { id: 3, name: "project_three" },
    ]);
};

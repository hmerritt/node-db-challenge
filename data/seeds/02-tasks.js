exports.seed = function (knex) {
    return knex("tasks").insert([
        { id: 1, project_id: 1, description: "project_one_task" },
        { id: 2, project_id: 2, description: "project_two_task" },
        { id: 3, project_id: 3, description: "project_three_task" },
    ]);
};

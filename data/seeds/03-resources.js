exports.seed = function (knex) {
    return knex("resources").insert([
        { id: 1, name: "recource_one" },
        { id: 2, name: "recource_two" },
        { id: 3, name: "recource_three" },
    ]);
};

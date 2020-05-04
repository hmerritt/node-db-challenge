const db = require("../../data/db.js");

//  Get row
function get(table, id=null) {
    if (id)
    {
        //  Get individial item
        return db(table).where("id", id).first();
    }
    else
    {
        //  Get all rows
        return db(table);
    }
}

//  Create a new record
function insert(table, data) {
    return db(table).insert(data);
}

//  Update a record
function update(table, id, data) {
    return db(table).where("id", id).update(data);
}

//  Delete record
function remove(table, id) {
    return db(table).where("id", id).del();
}


//  Custom

//  Get project tasks
function getTasks(id) {
    return db("tasks")
        .select("tasks.id", "tasks.project_id", "tasks.description", "tasks.notes", "tasks.completed")
        .join("projects", "projects.id", "tasks.project_id")
        .where("projects.id", id);
}



//  Validators

//  Check if record id exists
function validateId(table) {
    return (req, res, next) => {
        get(table, (req.params.id || null))
            .then((record) => {

                //  Check if record exists
                if (record) {

                    //  All good -> continue
                    //  Add record to request object
                    req.record = record;
                    next();

                } else {

                    //  No record found
                    res.status(400).json({
                        message: `invalid ${table} id`,
                    });

                }
            })
            .catch((error) => {
                next(error);
            });
    };
}

//  Validate the request body
function validateBody(table, cb) {
    return (req, res, next) => {
        //  Check that the request body exists
        if (req.body) {

            //  Validate using callback
            //  Will return a new req object
            req = cb(req);

            //  Check if recordBody was added to req body
            if (req.hasOwnProperty("recordBody")) {
                next();

            } else {
                res.status(400).json({
                    message: "missing required fields",
                });
            }

        //  No data sent in req.body
        } else {
            res.status(400).json({
                message: `missing ${table} data`,
            });
        }
    };
}


module.exports = {get, insert, update, remove, getTasks, validateId, validateBody};

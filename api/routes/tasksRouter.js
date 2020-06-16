const express = require("express");
const db = require("./db");

const router = express.Router();
const table = "tasks";
const validateBodyCb = (req) => {
    if (req.body.project_id && req.body.description) {
        req.recordBody = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: (req.body.completed || false)
        }
    }
    return req;
}

//  Get all tasks
router.get("/", db.validateId(table), async (req, res, next) => {
    try {
        const record = await db.getTasks();
        res.json(record);
    }
    catch (err) {
        next(err);
    }
});

//  Get individial
router.get("/:id", db.validateId(table), async (req, res, next) => {
    try {
        const record = await db.getTasks(req.record.id, "tasks.id");
        res.json(record);
    }
    catch (err) {
        next(err);
    }
});

//  Create a new task
router.post("/", db.validateBody(table, validateBodyCb), async (req, res, next) => {
    try {
        const [record_id] = await db.insert(table, req.recordBody);
        res.json({
            id: record_id,
            ...req.recordBody
        });
    }
    catch (err) {
        next(err);
    }
});

//  Update existing task
router.put("/:id", db.validateBody(table, validateBodyCb), db.validateId(table), async (req, res, next) => {
    try {
        const record = await db.update(table, req.record.id, req.recordBody);
        res.json({
            id: req.record.id,
            ...req.recordBody
        });
    }
    catch (err) {
        next(err);
    }
});

//  Delete task
router.delete("/:id", db.validateId(table), async (req, res, next) => {
    try {
        const record = await db.remove(table, req.record.id);
        if (record) {
            res.json({
                message: `${table} {${req.record.id}} deleted successfully`
            });
        }
        else
        {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;

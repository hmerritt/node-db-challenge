const express = require("express");
const db = require("./db");

const router = express.Router();
const table = "projects";
const validateBodyCb = (req) => {
    if (req.body.name) {
        req.recordBody = {
            name: req.body.name,
            description: req.body.description || null,
            completed: (req.body.completed || false)
        }
    }
    return req;
}

//  Get all projects
router.get("/", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

//  Get individial
router.get("/:id", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

//  Get individial tasks
router.get("/:id/tasks", db.validateId(table), async (req, res, next) => {
    try {
        const record = await db.getTasks(req.record.id, "projects.id");
        res.json(record);
    }
    catch (err) {
        next(err);
    }
});

//  Create a new project
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

//  Update existing project
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

//  Delete project
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

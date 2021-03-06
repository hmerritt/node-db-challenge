const express = require("express");
const db = require("./db");

const router = express.Router();
const table = "resources";
const validateBodyCb = (req) => {
    if (req.body.name) {
        req.recordBody = {
            name: req.body.name,
            description: req.body.description || null
        }
    }
    return req;
}

//  Get all resources
router.get("/", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

//  Get individial
router.get("/:id", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

//  Create a new resource
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

//  Update existing resource
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

//  Delete resource
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

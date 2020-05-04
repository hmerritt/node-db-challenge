const express = require("express");
const db = require("./db");

const router = express.Router();
const table = "resources";

//  Get all resources
router.get("/", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

//  Get individial
router.get("/:id", db.validateId(table), async (req, res, next) => {
    res.send(req.record);
});

module.exports = router;

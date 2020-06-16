const express = require('express');
const projectsRouter = require("./routes/projectsRouter");
const resourcesRouter = require("./routes/resourcesRouter");
const tasksRouter = require("./routes/tasksRouter");

const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/resources", resourcesRouter);
server.use("/tasks", tasksRouter);

module.exports = server;

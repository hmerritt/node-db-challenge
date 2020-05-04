const express = require('express');
const projectsRouter = require("./routes/projectsRouter");
const resourcesRouter = require("./routes/resourcesRouter");

const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/resources", resourcesRouter);

module.exports = server;

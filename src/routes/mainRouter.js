const express = require("express");
const apiRouter = express.Router();
const planetRouter = require("./planetRouter");

apiRouter.use("/planet", planetRouter);

module.exports = apiRouter;
const express = require("express");
const planetRouter = express.Router();

planetRouter.get("/", (req, res) => {
    res.send("Hello!");
});

planetRouter.get("/:id", (req, res) => {
    res.send("Hello, world!");
});

planetRouter.post("/", (req, res) => {
    res.send("Hello, world!");
});

planetRouter.put("/:id", (req, res) => {
    res.send("Hello, world!");
});

planetRouter.delete("/:id", (req, res) => {
    res.send("Hello, world!");
});

module.exports = planetRouter;
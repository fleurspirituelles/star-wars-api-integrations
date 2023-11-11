const express = require("express");
const planetRouter = express.Router();
const planetController = require("../controllers/planetController");

planetRouter.get("/", planetController.list);

planetRouter.get("/id/:id", planetController.get);

planetRouter.get("/name/:name", planetController.getByName);

planetRouter.post("/", planetController.insert);

planetRouter.put("/:id", planetController.update);

planetRouter.delete("/:id", planetController.remove);

module.exports = planetRouter;
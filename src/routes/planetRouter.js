const express = require("express");
const planetRouter = express.Router();
const planetController = require("../controllers/planetController");

planetRouter.get("/", planetController.getByName);

planetRouter.get("/:id", planetController.get);

planetRouter.post("/", planetController.insert);

planetRouter.put("/:id", planetController.update);

planetRouter.delete("/:id", planetController.remove);

module.exports = planetRouter;
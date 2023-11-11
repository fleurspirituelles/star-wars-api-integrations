const express = require("express");
const planetService = require('../services/planetService.js')

const planetController = {

    insert: async (req, res) => {
        const planet = req.body;

        planetService
            .insert(planet)
            .then(
                () => { res.sendStatus(201); },
                () => { res.sendStatus(400); }
            )
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id)
        const planet = req.body
        planetService
            .update(planet, id)
            .then(() => {
                res.sendStatus(200)
            })
    },

    list: async (req, res) => {
        planetService
            .list()
            .then(planets => {
                res.status(200).json(planets)
            })
    },

    get: async (req, res) => {
        const id = parseInt(req.params.id)
        planetService
            .get(id)
            .then(planet => {
                if (planet.length == 0)
                    return res.sendStatus(404);
                return res.status(200).json(planet);
            })
    },

    getByName: async (req, res) => {
        const name = req.params.name
        planetService
            .getByName(name)
            .then(planet => {
                if (planet.length == 0)
                    return res.sendStatus(404);
                return res.status(200).json(planet);
            })
    },

    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        return planetService
            .remove(id)
            .then(() => { return res.sendStatus(204) },
                () => { return res.sendStatus(404) })
    }
}

module.exports = planetController;
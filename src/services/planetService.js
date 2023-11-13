const planetRepository = require('../repositories/PlanetRepository');
const axios = require('axios');

const planetService = {
    insert: async (planet) => {
        let result = await validatePlanet(planet);
        if (result.success) {
            planet.data = result.data;
            return planetRepository.insert(planet);
        }
        throw new Error("Validation failed, planet not found.");
    },

    update: async (planet, id) => {
        let result = await planetService.get(id);
        if (result) {
            planet.id = id;
            return planetRepository.update(planet);
        }
        return false;
    },

    get: async (id) => {
        return planetRepository.get(id);
    },

    getByName: async (name) => {
        return planetRepository.getByName(name);
    },

    list: async () => {
        return planetRepository.list();
    },

    remove: async (id) => {
        let result = await planetService.get(id);
        if (result.length != 0)
            return planetRepository.remove(id);
        return;
    },
}

async function validatePlanet(planet) {
    let results = {}
    //TODO: Check if planet already exists in database.
    if (planet.name && planet.name.trim() !== "") {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/?search=${(planet.name)}`);
            if (response.data.results.length > 0) {
                results.data = response.data.results;
                results.success = true;
                return results;
            }
        } catch (error) {
            console.error("Error checking SWAPI: ", error);
        }
    }
    results.success = false;
    return results;
}

module.exports = planetService;
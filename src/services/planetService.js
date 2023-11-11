const planetRepository = require('../repositories/PlanetRepository');

const planetService = {
    insert: async (planet) => {
        if (await validatePlanet(planet))
            return planetRepository.insert(planet);
        return error;
    },

    update: async (planet, id) => {
        let result = await planetService.get(id);
        if (result.length != 0) {
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
    if (planet.nome != "" && planet.nome != undefined) {
        let result = await planetService.getByName(planet.nome)
        if (result.length == 0)
            return true;
    }
    return false;
}

module.exports = planetService;
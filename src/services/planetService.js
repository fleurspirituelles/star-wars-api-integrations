const planetRepository = require('../repositories/PlanetRepository');
const axios = require('axios');

const planetService = {
    insert: async (planet) => {
        try {
            const result = await validatePlanet(planet);
            if (result.success) {
                planet.data = result.data;
                const insertResult = await planetRepository.insert(planet);
                if (insertResult) {
                    return { success: true, message: "Planet created successfully!" };
                } else {
                    return { success: false, message: "Failed to create planet." };
                }
            } else {
                console.log("Validation failed: ", result.message);
                return { success: false, message: result.message };
            }
        } catch (error) {
            const customError = new Error(error.message);
            customError.status = 400;
            throw customError;
        }
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
};

async function validatePlanet(planet) {
    if (planet.name && planet.name.trim() !== "") {
        const existingPlanet = await planetService.getByName(planet.name);
        if (!existingPlanet || existingPlanet.length === 0) {
            try {
                const response = await axios.get(`https://swapi.dev/api/planets/?search=${planet.name}`);
                if (response.data.results.length > 0) {
                    return { success: true, data: response.data.results };
                } else {
                    return { success: false, message: "SWAPI validation failed: Planet not found." };
                }
            } catch (error) {
                console.error("Error checking SWAPI: ", error);
                return { success: false, message: "SWAPI validation failed." };
            }
        } else {
            console.log("Planet already exists.");
            return { success: false, message: "Planet already exists." };
        }
    } else {
        console.log("Invalid planet name.");
        return { success: false, message: "Invalid planet name." };
    }
}

module.exports = planetService;
const type = 'planets';

const planetRepository = {
    insert: async (planet) => {
        return fileManager.add(type, planet);
    },
    update: async (planet) => {
        return fileManager.update(type, planet);
    },
    get: async (id) => {
        return fileManager.getById(type, id);
    },
    getByName: async (planet) => {
        return fileManager.getByName(type, planet);
    },
    list: async () => {
        return fileManager.getAll(type);
    },
    remove: async (id) => {
        return fileManager.remove(type, id);
    }
}

export default planetRepository;
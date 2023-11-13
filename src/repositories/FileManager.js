const fs = require('fs');
const util = require('./Util.js');

const path = 'bd.json';
let bd;

const fileManager = {
    open: () => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        console.log("Could not access database: ", err);
                        reject(err);
                    } else {
                        bd = JSON.parse(data);
                        resolve(true);
                    }
                });
            } else {
                console.log("Could not access database: File does not exist!");
                resolve(false);
            }
        });
    },

    save: () => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                fs.writeFile(path, JSON.stringify(bd), (err) => {
                    if (err) {
                        console.log("Could not save database. ", err);
                        reject(err);
                    } else {
                        console.log("Database saved successfully!");
                        resolve(true);
                    }
                });
            } else {
                console.log("Could not save database: File does not exist!");
                resolve(false);
            }
        });
    },

    load: async () => {
        await fileManager.open();
    },

    getAll: (type) => {
        return fileManager.load().then(() => bd[type]);
    },

    getById: (type, id) => {
        return fileManager.load().then(() => util.findInArrayById(bd[type], id));
    },

    getByName: (type, name) => {
        return fileManager.load().then(() => util.findInArrayByName(bd[type], name));
    },

    add: (type, entity) => {
        return fileManager.load()
            .then(() => {
                const idFromUrl = entity.url.match(/\/(\d+)\/$/);
                entity.id = idFromUrl ? idFromUrl[1] : null;
                bd[type].push(entity);
                console.log(`Entity added: ${JSON.stringify(entity)}`);
                return fileManager.save();
            })
            .then(() => {
                console.log('Data saved successfully!');
                return true;
            })
            .catch(error => {
                console.error('Error during save: ', error);
                return false;
            });
    },

    update: (type, entity) => {
        return fileManager.load()
            .then(() => {
                let position = util.findPositionInArrayById(bd[type], entity.id);
                bd[type][position] = entity;
                return fileManager.save();
            })
            .then(() => true);
    },

    remove: (type, id) => {
        return fileManager.load()
            .then(() => {
                let position = util.findPositionInArrayById(bd[type], id);
                bd[type].splice(position, 1);
                return fileManager.save();
            })
            .then(() => true);
    }
};

module.exports = fileManager;
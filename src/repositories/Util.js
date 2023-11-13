const util = {

  findInArrayById: (array, id) => {
    let result = [];
    for (const element in array) {
      if (array[element]["id"] == id) {
        result = array[element];
        break;
      }
    }
    return result;
  },

  findInArrayByName: (array, name) => {
    let result = [];
    array.forEach((element) => {
      if (element["name"] == name) result = element;
    });
    return result;
  }

};

module.exports = util;
const util = {

  findInArrayById: (array, id) => {
    let result = [];
    for (const element in array) {
      if (array[element]["id"] == id) {
        console.log(array[element]);
        result = array[element];
        break;
      }
    }
    console.log(result);
    return result;
  },

  findInArrayByName: (array, name) => {
    console.log(array);
    let result = [];
    array.forEach((element) => {
      console.log(element["name"]);
      if (element["name"] == name) result = element;
    });
    console.log(result);
    return result;
  }

};

module.exports = util;
UTIL = {};

UTIL.random = function (min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

UTIL.init1DArray = function (array, loopSpec) {
    var rows = loopSpec.cols;
    var cols = loopSpec.rows;
    var totalObjects = rows * cols;
    for (i = 0; i < totalObjects; i += 1) {
        loopSpec.loopFunction(array);
    }
    return array;
};

module.exports = UTIL; 

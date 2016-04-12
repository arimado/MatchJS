console.log('state.js');

var UTIL = require('./util.js');

exports.columns = 5;
exports.rows = 4;
exports.game = 0;
exports.board = [];
exports.activeCards = [];
exports.cardObjectStructure = function (array) {
    cardObject = {
        active: false,
        content: '&nbsp;var&nbsp;memoizer&nbsp;=&nbsp;function&nbsp;(memo,&nbsp;fundemental)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;shell&nbsp;=&nbsp;function&nbsp;(n)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;result&nbsp;=&nbsp;memo[n];&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(typeof&nbsp;result&nbsp;!==&nbsp;&quot;number&quot;)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result&nbsp;=&nbsp;fundemental(shell,&nbsp;n);&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memo[n]&nbsp;=&nbsp;result;&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;result;&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;shell;&nbsp;&nbsp;&nbsp;</br>&nbsp;};&nbsp;&nbsp;&nbsp;</br>',
        pairGroup: 0,
        found: false
    };
    array.push(cardObject);
};

exports.populateBoard = function (board, columns, rows) {
    UTIL.init1DArray(board, {loopFunction: exports.cardObjectStructure, cols: columns, rows: rows});
    return board;
};

exports.populatePairs = function (populatedBoard) {

    var totalObjects = populatedBoard.length;
    var positions = [];
    var totalPositions;

    // POPULATE possible matches into single array
    // REFACTOR: could put position.push(i) twice in a single loop
    for (i = 0; i < totalObjects / 2; i += 1) positions.push(i);
    for (i = 0; i < totalObjects / 2; i += 1) positions.push(i);

    totalPositions = positions.length;

    for (i = 0; i < totalObjects; i += 1) {
        // Get a randum number from the position Array
        var randNumPositionArray = UTIL.random(0, positions.length - 1);
        var randPosition = positions[randNumPositionArray];
        // Put that random number in cards array
        populatedBoard[i].pairGroup = randPosition;
        // get rid of that number from the positions array
        positions.splice(randNumPositionArray, 1);
    }
    return populatedBoard;
};

exports.updateData = function (matchedBoard, cardID) {
    var updatedBoard;

    // change matched board of selected cardID
    // question is... this updates two properties of the DATA
    // should we be updating more?
    // where does this updateData return?

    matchedBoard[cardID].active = true;
    matchedBoard[cardID].found = true;
    updatedBoard = matchedBoard;
    return updatedBoard;
};

// DELETE THIS ------------------------------------------------------
exports.updateDataBACKUP = function (matchedBoard, cardID) {
    var updatedBoard;
    matchedBoard[cardID].active = true;
    matchedBoard[cardID].found = true;
    updatedBoard = matchedBoard;
    return updatedBoard;
};
// ------------------------------------------------------------------

exports.isPairFound = function (updatedBoard, activeCardsArray, clickedCardId) {
    var pairsCheckedBoard;
    var card1, card2;
    if (activeCardsArray.length == 2) {
        card1PairGroup = updatedBoard[activeCardsArray[0]].pairGroup;
        card2PairGroup = updatedBoard[activeCardsArray[1]].pairGroup;
        if (card1PairGroup === card2PairGroup) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

exports.addActiveCard = function () {
};

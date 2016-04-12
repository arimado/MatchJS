var RENDER = require('./render.js');
var STATE = require('./state.js');

exports.addEvents = function (matchedBoard, gameElement, eventCallback) {
    var cardElements = document.getElementsByClassName('card');
    var forEach = Array.prototype.forEach;
    forEach.apply(cardElements, [RENDER.addListeners(matchedBoard, gameElement)]);
    var matchedEventBoard = matchedBoard;
    return matchedEventBoard;
};

exports.cardClick = function (matchedBoard, gameElement) {
    return function () {
        console.log('card-length - ' + STATE.activeCards.length);
        if (STATE.activeCards.length < 2) {
            var clickedCardId = this.idNumber;  // THIS!
            // On CLICK
            STATE.activeCards.push(clickedCardId);
            var updatedBoard = STATE.updateData(matchedBoard, clickedCardId);
            RENDER.updateElements(updatedBoard, gameElement);

            // On Click CoolDown
            var pairFound = STATE.isPairFound(updatedBoard, STATE.activeCards);
            var updatedPairsBoard = exports.coolDown(updatedBoard, gameElement, STATE.activeCards.length, pairFound);
            console.log('active cards - ' + STATE.activeCards);
        }
    };
};

exports.coolDown = function (updatedBoard, gameElement, totalActiveCards, pairFound) {
    var coolDown;
    var cardElements = document.getElementsByClassName('card');

    if ( totalActiveCards === 2 ) {
        if (pairFound) {
            STATE.activeCards = [];
        } else {
            // turn active cards to false;
            updatedBoard[STATE.activeCards[0]].active = false;
            updatedBoard[STATE.activeCards[1]].active = false;
            updatedBoard[STATE.activeCards[0]].found = false;
            updatedBoard[STATE.activeCards[1]].found = false;
            coolDown = window.setTimeout(exports.resetActiveCards(updatedBoard, gameElement), 1000);
        }
    }
};

exports.fade = function (node) {
    console.log(node);
    var level = 0;
    var step = function () {
        node.style.opacity = level;
        if (level < 1) {
            level += 0.1;
            setTimeout(step, 50);
        }
    }
    step();
};

exports.resetActiveCards = function (updatedBoard, gameElement) {
    return function () {
        STATE.activeCards = [];
        RENDER.updateElements(updatedBoard, gameElement);
        console.log('activeCards reset');
    }
}

// INITIALISE BOARD
// initialise board with set columns and rows
// 1. initialise a one dimensional array of objects with set properties

exports.init = function () {

    var board = STATE.board;
    var col = STATE.columns;
    var row = STATE.rows;

    var populatedBoard = STATE.populateBoard(board, col, row);
    var matchedBoard = STATE.populatePairs(populatedBoard);

    RENDER.function();

    var gameElement = RENDER.createBoard(matchedBoard);

    exports.addEvents(matchedBoard, gameElement, exports.cardClick);
};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./render.js":3,"./state.js":4}],2:[function(require,module,exports){
(function () {
	console.log('loaded5');

	var ACTION = require('./action.js');

	ACTION.init();
})();

},{"./action.js":1}],3:[function(require,module,exports){
console.log('render.js');

var ACTION = require('./action.js');
var STATE = require('./state.js');

exports.function = function () {
    console.log('this is a function');
}

exports.createBoard = function (matchedBoard) {

    // COMAPRE new and previous DATA
    // COMPARE

    var wrapDiv = document.getElementById('wrap');
    var gameElement = document.createElement('div');
    var idNumber = 0;
    var state = 0;

    gameElement.id = 'match' + (STATE.game + 1);
    gameElement.className = 'matchGame';

    wrapDiv.appendChild(gameElement);

    matchedBoard.forEach( function (card) {

        var currentDardStateData = matchedBoard[idNumber].active;
        var currentPairState = matchedBoard[idNumber].active;

        var currentCardElement = document.createElement('div');
        var currentCardElementInner = document.createElement('div');
        var currentCardPairGroup = document.createElement('p');
        var currentCardState = document.createElement('p');
        var currentCardContent = document.createElement('p');

        currentCardPairGroup.innerHTML = card.pairGroup;
        currentCardState.innerHTML = card.active;
        currentCardContent.innerHTML = card.content;

        currentCardElement.idNumber = idNumber;
        currentCardElement.className = 'card';
        currentCardElementInner.className = 'cardInner';

        currentCardPairGroup.className = 'pairGroup';
        currentCardState.className = 'state';
        currentCardContent.className = 'content';

        gameElement.appendChild(currentCardElement);
        currentCardElement.appendChild(currentCardElementInner);

        currentCardElementInner.appendChild(currentCardState);

        // Here's the state stuff
        // Try and get rid of clickable later on though

        if (currentDardStateData) {
            // currentCardElementInner.appendChild(currentCardContent);
            currentCardElementInner.appendChild(currentCardPairGroup);
            currentCardElementInner.className = 'cardInner';
        } else {
            currentCardElementInner.className = 'cardInner clickable';
        }

        idNumber += 1;
    });

    return gameElement;
};

exports.updateElements = function (updatedBoard, gameElement) {
    document.getElementById(gameElement.id).remove();
    exports.createBoard(updatedBoard);
    ACTION.addEvents(updatedBoard, gameElement, ACTION.cardClick);
};

exports.addListeners = function (matchedBoard, gameElement) {
    return function(card, i) {
        var pairFound = matchedBoard[i].found;
            var pairActive = matchedBoard[i].active;
            if (pairFound) {
                return;
            } else if (pairActive) {
                return;
            } else {
                card.addEventListener('click', ACTION.cardClick(matchedBoard, gameElement));
        }
    };
};

},{"./action.js":1,"./state.js":4}],4:[function(require,module,exports){
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

},{"./util.js":5}],5:[function(require,module,exports){
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

},{}]},{},[2]);

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

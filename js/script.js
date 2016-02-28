(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 6; 
	MATCH.STATE.rows = 4; 
	MATCH.STATE.game = 0; 

	MATCH.STATE.board = [];
	MATCH.STATE.totalCardsActive = 0;  
	MATCH.STATE.activeCards; 

	MATCH.UTIL = {}; 

	MATCH.UTIL.random = function (min, max) {
		if (max == null) {
			max = min; 
			min = 0; 
		}
		return min + Math.floor(Math.random() * (max - min + 1)); 
	}

	MATCH.UTIL.init1DArray = function (array, loopSpec) {

		var rows = loopSpec.cols; 
		var cols = loopSpec.rows; 
		var totalObjects = rows * cols; 

		for (i = 0; i < totalObjects; i += 1) {
			loopSpec.loopFunction(array); 
		} 
		return array; 
	}

	MATCH.STATE.cards = function () {  
	} 

	MATCH.STATE.populateBoard = function (board, columns, rows) { 
		var initColObj = function (array) {
			cardObject = {
				active: false, 
				content: "string of content",
				pairGroup: 0
			}; 
			array.push(cardObject); 
		} 
		MATCH.UTIL.init1DArray(board, {loopFunction: initColObj, cols: columns, rows: rows});  
		return board;
	}; 

	MATCH.STATE.populatePairs = function (populatedBoard) {

		var totalObjects = populatedBoard.length; 
		var positions = [];  
		var totalPositions; 

		for (i = 0; i < totalObjects / 2; i += 1) positions.push(i);
		for (i = 0; i < totalObjects / 2; i += 1) positions.push(i); 
		
		totalPositions = positions.length; 

		for (i = 0; i < totalObjects; i += 1) {
			var randNumPositionArray = MATCH.UTIL.random(0, positions.length - 1); 
			var randPosition = positions[randNumPositionArray];  
			populatedBoard[i].pairGroup = randPosition; 
			positions.splice(randNumPositionArray, 1); 
		}

		return populatedBoard; 
	}; 

	MATCH.STATE.update = function (matchedBoard, cardID) {

		var updatedBoard; 
		matchedBoard[cardID].active = true;
		updatedBoard = matchedBoard; 
		return updatedBoard;
	}; 

	MATCH.RENDER.createBoard = function (matchedBoard) { 

		var wrapDiv = document.getElementById('wrap');
		var gameElement = document.createElement('div'); 
		var idNumber = 0; 
		var state = 0; 

		gameElement.id = 'match' + (MATCH.STATE.game + 1);

		wrapDiv.appendChild(gameElement); 

		matchedBoard.forEach( function (card) { 

			var currentCardElement = document.createElement('div');
			var currentCardPairGroup = document.createElement('p'); 
			var currentCardState = document.createElement('p'); 
			var currentCardContent = document.createElement('p'); 

			currentCardPairGroup.innerHTML = card.pairGroup; 	
			currentCardState.innerHTML = card.active; 
			currentCardContent.innerHTML = card.content; 

			currentCardElement.idNumber = idNumber;
			currentCardElement.className = 'card';
			currentCardPairGroup.className = 'pairGroup'; 

			// currentCardElement.addEventListener('click', MATCH.ACTION.cardClick(gameElement)); 

			gameElement.appendChild(currentCardElement); 

			currentCardElement.appendChild(currentCardPairGroup);
			currentCardElement.appendChild(currentCardState);  
			currentCardElement.appendChild(currentCardContent); 

			idNumber += 1; 
		});  

		return gameElement; 
	};

	MATCH.RENDER.update = function (updatedBoard, gameElement) {

		document.getElementById(gameElement.id).remove();
		MATCH.RENDER.createBoard(updatedBoard);
		MATCH.ACTION.addEvents(updatedBoard, gameElement, MATCH.ACTION.cardClick); 

	}; 

	MATCH.ACTION.addEvents = function (matchedBoard, gameElement, eventCallback) {
		
		var cardElements = document.getElementsByClassName('card'); 
		var forEach = Array.prototype.forEach;

		var addListeners = function (card) {
			card.addEventListener('click', MATCH.ACTION.cardClick(matchedBoard, gameElement)); 
		}

		forEach.apply(cardElements, [addListeners]); 
		var matchedEventBoard = matchedBoard; 

		return matchedEventBoard; 
	}; 

	MATCH.ACTION.cardClick = function (matchedBoard, gameElement) {

		// context is element 
		var that = this; 

		return function () {

			var clickedCardId = this.idNumber;  

			if ( MATCH.STATE.totalCardsActive == 2 ) {
				console.log('wait for the cooldown'); 
			} else {
				var updatedBoard = MATCH.STATE.update(matchedBoard, clickedCardId); 
				MATCH.RENDER.update(updatedBoard, gameElement);
			}

			console.log('cards active - ' + MATCH.STATE.totalCardsActive); 
			console.log('card ID - ' + clickedCardId); 

			MATCH.STATE.totalCardsActive === 2 ? MATCH.STATE.totalCardsActive = 2 : MATCH.STATE.totalCardsActive += 1;
		}; 
	};

	MATCH

	MATCH.ACTION.init = function () {
		
		var board = MATCH.STATE.board;
		var col = MATCH.STATE.columns;
		var row = MATCH.STATE.rows; 

		var populatedBoard = MATCH.STATE.populateBoard(board, col, row);
		var matchedBoard = MATCH.STATE.populatePairs(populatedBoard);
		var gameElement = MATCH.RENDER.createBoard(matchedBoard);
		
		MATCH.ACTION.addEvents(matchedBoard, gameElement, MATCH.ACTION.cardClick); 

	};

	MATCH.ACTION.init(); 

})(); 


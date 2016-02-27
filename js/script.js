(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 6; 
	MATCH.STATE.rows = 4; 

	MATCH.STATE.board = []; 

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
		console.log('MATCH.STATE.populatePairs -------- ');

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

	MATCH.RENDER.init = function (matchedBoard) { 

		var wrapDiv = document.getElementById('wrap');
		var gameElement = document.createElement('div'); 

		wrapDiv.appendChild(gameElement); 

		matchedBoard.forEach( function (card) {

			var currentCardElement = document.createElement('div');
			var currentCardPairGroup = document.createElement('p'); 
			var currentCardState = document.createElement('p'); 
			var currentCardContent = document.createElement('p'); 

			currentCardPairGroup.innerHTML = card.pairGroup; 	
			currentCardState.innerHTML = card.active; 
			currentCardContent.innerHTML = card.content; 

			currentCardElement.className = 'card';
			currentCardPairGroup.className = 'pairGroup'; 


			gameElement.appendChild(currentCardElement); 

			currentCardElement.appendChild(currentCardPairGroup);
			currentCardElement.appendChild(currentCardState);  
			currentCardElement.appendChild(currentCardContent);  

		}); 
	}

	MATCH.RENDER.drawBoard = function () {
		// Get the HTML elements in there 
	};

	MATCH.RENDER.paintBoard = function () {
		// get the HTML data in there 
	};

	MATCH.ACTION.cardClicks = function () {
		// state changes
		// compare active pair functions 
		// repaint ? 
	};

	MATCH.ACTION.init = function () {
		
		var board = MATCH.STATE.board;
		var col = MATCH.STATE.columns;
		var row = MATCH.STATE.rows; 

		var populatedBoard = MATCH.STATE.populateBoard(board, col, row);
		var matchedBoard = MATCH.STATE.populatePairs(populatedBoard);

		MATCH.RENDER.init(matchedBoard);
	};

	MATCH.ACTION.init(); 

})(); 


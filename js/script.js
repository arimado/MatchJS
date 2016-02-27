(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 2; 
	MATCH.STATE.rows = 2; 

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

		var totalObjects = populatedBoard.length;
		var totalPairs = totalObjects / 2; 

		while (totalPairs > 0) {

			var randomNum1 = MATCH.UTIL.random(0, totalPairs - 1); 
			var randomNum2 = MATCH.UTIL.random(0, totalPairs - 1); 

			var currentCard1 = populatedBoard[randomNum1].pairGroup;
			var currentCard2 = populatedBoard[randomNum2].pairGroup;

			if ((currentCard1 === 0) && (currentCard2 === 0)) {

				console.log(randomNum1);
				console.log(randomNum2); 

				populatedBoard[randomNum1].pairGroup = totalPairs + 1; 
				populatedBoard[randomNum2].pairGroup = totalPairs + 1;
				
			}

			totalPairs = totalPairs - 1; 
		}

		return populatedBoard; 
	};

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

		console.dir(matchedBoard); 

	};

	MATCH.ACTION.init(); 

})(); 


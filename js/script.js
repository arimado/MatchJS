(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 10; 
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

	MATCH.UTIL.loop2D = function (array, loopSpec) {
		var rows = loopSpec.; 
		var cols = MATCH.STATE.columns;  
		for (row = 0; row < rows; row += 1) {
			rowFunction(array); 
			for (column = 0; column < cols; column += 1) {
				colFunction(array);  
			}
		} 
		return array;
	}
	
	MATCH.STATE.cards = function () {
		// store cards here t
	}

	MATCH.STATE.populateBoard = function (board, columns, rows) {
		
		var initRowArray = function (array) {
			array[row] = []; 
		}

		var initColObj = function (array) {
			cardObject = {
				active: false, 
				content: "string of content",
				position: { row: row, column: column }, 
				pairGroup: 0
			}; 
			array[row].push(cardObject);
		}

		console.log(board);

		return board; 
	};

	MATCH.STATE.populatePairs = function () {

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
		// init your shit mate 

	};

	MATCH.ACTION.init(); 

})(); 


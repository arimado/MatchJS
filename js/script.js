(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 10; 
	MATCH.STATE.rows = 4; 

	MATCH.STATE.board = []; 	// variables up in object scope so they can be shared by function down in scope

	MATCH.UTIL = {}; 

	// UTIL function from Minesweeper from some place on the internet 
	MATCH.UTIL.random = function (min, max) {
		if (max == null) {
			max = min; 
			min = 0; 
		}
		return min + Math.floor(Math.random() * (max - min + 1)); 
	}

	MATCH.UTIL.loop2D = function (array, rowFunction, colFunction) {

		var rows = MATCH.STATE.rows; 
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

		MATCH.UTIL.loop2D(board, initRowArray, initColObj); 





		console.log(board);

		return board; 
	};

	MATCH.STATE.populatePairs = function (board) {

		// randomly create pairs in array 

		// 2d array length

		// half the number

		// put double of every number in the board 

			// randomise using a UTIL function first 

				//if empty pairGroup place property if not continue looking for empty pairGroup 

				// keep going until there is none 

		// LETS MEMOIZ THIS MOTHERFUCKER! 

		var rows = board.length
		var columns = board[0].length

		for (row = 0; row < rows; row += 1) {
			for (column = 0; column < columns; column += 1) {

			}
		}

		var positions = [];

		

		var totalPairs = rows * columns / 2; 

		
		



		console.log(totalPairs); 

		return board; 
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

		MATCH.STATE.populatePairs(MATCH.STATE.populateBoard(MATCH.STATE.board, MATCH.STATE.columns, MATCH.STATE.rows)); 

	};

	MATCH.ACTION.init(); 

})(); 


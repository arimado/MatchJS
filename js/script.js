(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 10; 
	MATCH.STATE.rows = 4; 

	MATCH.STATE.board = []; 	// variables up in object scope so they can be shared by function down in scope

	MATCH.STATE.populateBoard = function (board, columns, rows) {

		// init 2d array with objects 
		// randomly create pairs in array 

		for (row = 0; row < rows; row += 1) {
			board[row] = []; 
			for (column = 0; column < columns; column += 1) {
				board[row].push([]);
			}
		}

		return board; 


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
		// init your shit mate 

		console.log(MATCH.STATE.populateBoard(MATCH.STATE.board, MATCH.STATE.columns, MATCH.STATE.rows)); 

	};

	MATCH.ACTION.init(); 

})(); 


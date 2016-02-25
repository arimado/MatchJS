(function () {

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 10; 
	MATCH.STATE.rows = 4; 

	MATCH.STATE.board = []; 	// variables up in object scope so they can be shared by function down in scope
	
	MATCH.STATE.cards = function () {
		// store cards here
	}

	MATCH.STATE.populateBoard = function (board, columns, rows) {
		// init 2d array with objects 
		var cardObject; 
		for (row = 0; row < rows; row += 1) {
			board[row] = []; 
			for (column = 0; column < columns; column += 1) {
				cardObject = {
					active: false, 
					content: "string of content",
					pairGroup: 'position: ' + row + ' - ' + column
				}; 
				board[row].push(cardObject);
			}
		}
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

		var totalPairs = board.length * board[0].length / 2; 

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


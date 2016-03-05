(function () {

	// RENDER ENGINE GOALS 

	// - do the single event listener thing that goes on the parent 
	// - create a createDiv function 

	// - i need a function that gives me the active state and previous state and compares the two 
	// - these two states would be the virtual DOM kind of thing 
	// - all i want to be doing is manipulting stuff on the DATA and for that to be reflected with my render function 

	// REACTIVE JS LIBRARY -------------------------------------
	// *********************************************************

	var SNOOP = {};

	SNOOP.createDiv = function () {

		// create a div with a specified attributes and 
		// 

	};  

	// ********************************************************
	// --------------------------------------------------------

	var MATCH = {};

	MATCH.STATE = {}; 
	MATCH.RENDER = {}; 
	MATCH.ACTION = {}; 

	MATCH.STATE.columns = 5; 
	MATCH.STATE.rows = 4; 
	MATCH.STATE.game = 0; 

	MATCH.STATE.board = [];
	MATCH.STATE.activeCards = [];

	MATCH.UTIL = {};

	MATCH.UTIL.random = function (min, max) {
		if (max == null) {
			max = min; 
			min = 0; 
		}
		return min + Math.floor(Math.random() * (max - min + 1)); 
	};

	MATCH.UTIL.init1DArray = function (array, loopSpec) {
		var rows = loopSpec.cols; 
		var cols = loopSpec.rows; 
		var totalObjects = rows * cols; 

		for (i = 0; i < totalObjects; i += 1) {
			loopSpec.loopFunction(array); 
		} 
		return array; 
	};

	MATCH.STATE.cardObjectStructure = function (array) {
		cardObject = {
			active: false, 
			content: '&nbsp;var&nbsp;memoizer&nbsp;=&nbsp;function&nbsp;(memo,&nbsp;fundemental)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;shell&nbsp;=&nbsp;function&nbsp;(n)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;result&nbsp;=&nbsp;memo[n];&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(typeof&nbsp;result&nbsp;!==&nbsp;&quot;number&quot;)&nbsp;{&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result&nbsp;=&nbsp;fundemental(shell,&nbsp;n);&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memo[n]&nbsp;=&nbsp;result;&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;result;&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;&nbsp;</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;shell;&nbsp;&nbsp;&nbsp;</br>&nbsp;};&nbsp;&nbsp;&nbsp;</br>',
			pairGroup: 0, 
			found: false 
		}; 
		array.push(cardObject); 
	}; 

	MATCH.STATE.populateBoard = function (board, columns, rows) { 
		MATCH.UTIL.init1DArray(board, {loopFunction: MATCH.STATE.cardObjectStructure, cols: columns, rows: rows});  
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

	MATCH.STATE.activateClickedCards = function (matchedBoard, cardID) {  
		var updatedBoard;  
		matchedBoard[cardID].active = true;
		matchedBoard[cardID].found = true; 
		updatedBoard = matchedBoard; 
		return updatedBoard; 
	};

	MATCH.STATE.isPairFound = function (updatedBoard, activeCardsArray, clickedCardId) {
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

	MATCH.STATE.addActiveCard = function () {
	};

	MATCH.RENDER.createBoard = function (matchedBoard) { 

		// COMAPRE new and previous DATA 
		// COMPARE 

		var wrapDiv = document.getElementById('wrap');
		var gameElement = document.createElement('div'); 
		var idNumber = 0; 
		var state = 0; 

		gameElement.id = 'match' + (MATCH.STATE.game + 1);
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

	MATCH.RENDER.updateElements = function (updatedBoard, gameElement) { 
		document.getElementById(gameElement.id).remove();
		MATCH.RENDER.createBoard(updatedBoard); 
		MATCH.ACTION.addEvents(updatedBoard, gameElement, MATCH.ACTION.cardClick); 
	};

	MATCH.RENDER.addListeners = function (matchedBoard, gameElement) {
		return function(card, i) {
			var pairFound = matchedBoard[i].found;
				var pairActive = matchedBoard[i].active; 
				if (pairFound) {
					return; 
				} else if (pairActive) {
					return; 
				} else {
					card.addEventListener('click', MATCH.ACTION.cardClick(matchedBoard, gameElement)); 
			}
		};
	}; 

	MATCH.ACTION.addEvents = function (matchedBoard, gameElement, eventCallback) { 
		var cardElements = document.getElementsByClassName('card'); 
		var forEach = Array.prototype.forEach; 
		forEach.apply(cardElements, [MATCH.RENDER.addListeners(matchedBoard, gameElement)]);  
		var matchedEventBoard = matchedBoard; 
		return matchedEventBoard; 
	};

	MATCH.ACTION.cardClick = function (matchedBoard, gameElement) {
		return function () { 
			console.log('card-length - ' + MATCH.STATE.activeCards.length); 
			if (MATCH.STATE.activeCards.length < 2) {
				var clickedCardId = this.idNumber;  // THIS!

				// On CLICK 
				MATCH.STATE.activeCards.push(clickedCardId);
				var updatedBoard = MATCH.STATE.activateClickedCards(matchedBoard, clickedCardId);
				MATCH.RENDER.updateElements(updatedBoard, gameElement); 

				// On Click CoolDown 
				var pairFound = MATCH.STATE.isPairFound(updatedBoard, MATCH.STATE.activeCards); 
				var updatedPairsBoard = MATCH.ACTION.coolDown(updatedBoard, gameElement, MATCH.STATE.activeCards.length, pairFound); 
				console.log('active cards - ' + MATCH.STATE.activeCards); 
			}
		}; 
	}; 

	MATCH.ACTION.coolDown = function (updatedBoard, gameElement, totalActiveCards, pairFound) { 
		var coolDown;
		var cardElements = document.getElementsByClassName('card'); 

		if ( totalActiveCards === 2 ) { 
			if (pairFound) {
				MATCH.STATE.activeCards = []; 
			} else {
				// turn active cards to false; 
				updatedBoard[MATCH.STATE.activeCards[0]].active = false; 
				updatedBoard[MATCH.STATE.activeCards[1]].active = false; 
				updatedBoard[MATCH.STATE.activeCards[0]].found = false; 
				updatedBoard[MATCH.STATE.activeCards[1]].found = false; 

				

				coolDown = window.setTimeout(MATCH.ACTION.resetActiveCards(updatedBoard, gameElement), 1000);  
			}
		}
	}; 

	MATCH.ACTION.fade = function (node) {
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

	MATCH.ACTION.resetActiveCards = function (updatedBoard, gameElement) {
		return function () { 
			MATCH.STATE.activeCards = []; 
			MATCH.RENDER.updateElements(updatedBoard, gameElement); 
			console.log('activeCards reset'); 
		}
	}


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


const gameBoard = (() => {
    const boardCell = Array.from(document.querySelectorAll('td'));
    let player1;
    let player2;

    const buttons = (() => {
        reset = document.querySelector('.reset-btn button');
        multiplayerGame = document.querySelector('#human-btn');
        AIGame = document.querySelector('#AI-btn');
        return {reset, multiplayerGame, AIGame}
    })();

    const plays = (() => {
        x = [];
        o = [];
        last = null;
        winningCombos = [
            [0,1,2], //across top
            [3,4,5], //across middle
            [6,7,8], //across bottom
            [0,3,6], //left down
            [1,4,7], //middle down
            [2,5,8], //right down
            [0,4,8], //top left to bottom right
            [2,4,6] // top right to bottom left
        ];
        currentBoard = findCurrentBoard();
        return {x, o, winningCombos, currentBoard}
    })();

    const gameStatus = (() => {
        started = false;
        won = false;
        isMultiplayer = null;
        return {started, won, isMultiplayer} 
    })();

    
    function checkIfXWins() {
        if (plays.x.length < 3) return;
        
        for (let i = 0; i < plays.winningCombos.length; i++) {
            let win = true;
            for (let j = 0; j < plays.winningCombos[i].length; j++) {
                if (!plays.x.includes(plays.winningCombos[i][j])) {
                    win = false;
                    break;
                }
            }
            if (win) {
                gameStatus.won = true;
                document.querySelector('h2').innerText = `${player1} wins!`;
                document.querySelector('h2').classList.remove('hidden');
                break;
            }
            checkIfTied(win);
        }
    };
    
    function checkIfOWins() {
        if (plays.o.length < 3) return;
        
        for (let i = 0; i < plays.winningCombos.length; i++) {
            let win = true;
            for (let j = 0; j < plays.winningCombos[i].length; j++) {
                if (!plays.o.includes(plays.winningCombos[i][j])) {
                    win = false;
                    break;
                }
            }
            if (win) {
                gameStatus.won = true;
                document.querySelector('h2').innerText = `${player2} wins!`;
                document.querySelector('h2').classList.remove('hidden');
                break;
            }
            checkIfTied(win);
        }
    };
    
    function checkIfTied(win) {
        if (plays.x.length + plays.o.length == 9 && !win) {
            document.querySelector('h2').innerText = `Tie!`
            document.querySelector('h2').classList.remove('hidden');
        }
    }
    
    function runMultiplayerGame(cell) {
        if (cell.innerText != '' || gameStatus.won || !gameStatus.started) {
            return;
        } else if (plays.last == null || plays.last == 'O') {
            cell.innerText = 'X';
            plays.last = 'X';
            plays.x.push(Number(cell.dataset.index));
            plays.x.sort();
            checkIfXWins()
        } else {
            cell.innerText = 'O';
            plays.last = 'O';
            plays.o.push(Number(cell.dataset.index));
            plays.o.sort();
            checkIfOWins()
        }
    }
    
    function runAIGame(cell) {
        if (cell.innerText != '' || gameStatus.won || !gameStatus.started) {
            return;
        } else { // run code for human click
            cell.innerText = 'X';
            plays.x.push(Number(cell.dataset.index));
            plays.x.sort();
            checkIfXWins();
            plays.currentBoard = findCurrentBoard();

            if (!gameStatus.won) { // run code for AI move
                let bestMove = minimax(plays.currentBoard, 'O');
                boardCell.forEach((cell) => {
                    if (cell.dataset.index == bestMove.index) {
                        cell.innerText = 'O'
                        plays.o.push(Number(cell.dataset.index))
                        plays.o.sort();
                    }
                });
                checkIfOWins();
            }
        }
    }

    function findCurrentBoard() {
        let arr = [];
        for (i = 0; i < boardCell.length; i++) {
            if (boardCell[i].innerText == '') {
                arr.push(boardCell[i].dataset.index)
            } else {
                arr.push(boardCell[i].innerText)
            }
        }
        return arr;
    }

    function winning(board, player){
        if (
               (board[0] == player && board[1] == player && board[2] == player) ||
               (board[3] == player && board[4] == player && board[5] == player) ||
               (board[6] == player && board[7] == player && board[8] == player) ||
               (board[0] == player && board[3] == player && board[6] == player) ||
               (board[1] == player && board[4] == player && board[7] == player) ||
               (board[2] == player && board[5] == player && board[8] == player) ||
               (board[0] == player && board[4] == player && board[8] == player) ||
               (board[2] == player && board[4] == player && board[6] == player)
            ) {
                return true;
            } else {
                return false;
            }
    } 

    function minimax(board, player){
       let emptyCellsIndexes = board.filter(s => s != "O" && s != "X");
        
        if (winning(board, 'X')) {
            return {score: -10};
        } else if (winning(board, 'O')) {
            return {score: 10};
        } else if (emptyCellsIndexes.length === 0){
            return {score: 0};
        }
        
        let moves = [];
        
        for (let i = 0; i < emptyCellsIndexes.length; i++) {
            let move = {};
            move.index = board[emptyCellsIndexes[i]];
        
            board[emptyCellsIndexes[i]] = player;
        
            if (player == 'O'){
                let result = minimax(board, 'X');
                move.score = result.score;
            } else {
                let result = minimax(board, 'O');
                move.score = result.score;
            }
        
            board[emptyCellsIndexes[i]] = move.index;     //reset the spot to empty
        
            moves.push(move);
        }
        
        let bestMove;
        
        if (player === 'O') {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++){
                if (moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else { 
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if (moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        
        return moves[bestMove];
    }
      
    boardCell.forEach( (cell) => {
        cell.addEventListener('click', () => {
            if (gameStatus.isMultiplayer) {
                runMultiplayerGame(cell);
            } else {
                runAIGame(cell);
            }
        });
    });

    buttons.reset.addEventListener('click', () => {
        boardCell.forEach( (cell) => {
            cell.innerText = '';
        })
        plays.x = [];
        plays.o = [];
        gameStatus.won = false;
        plays.last = null;
        gameStatus.started = false;

        document.querySelector('.start-btns').classList.remove('hidden');
        document.querySelector('.multiplayer-game-input').classList.add('hidden');
        document.querySelector('.AI-game-input').classList.add('hidden');
        document.querySelector('h2').classList.add('hidden')

        player1 = null;
        player2 = null;
    });

    buttons.multiplayerGame.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.multiplayer-game-input').classList.remove('hidden');
        gameStatus.isMultiplayer = true;
        startGame();
    });

    buttons.AIGame.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.AI-game-input').classList.remove('hidden');
        gameStatus.isMultiplayer = false;
        startGame();
    });

    const startGame = function () {
        const startGameBtn = document.querySelectorAll('.start-game')
        startGameBtn.forEach( (button) => {
            button.addEventListener('click', () => {
                document.querySelector('.start-btns').classList.add('hidden');
                document.querySelector('.multiplayer-game-input').classList.add('hidden');
                document.querySelector('.AI-game-input').classList.add('hidden');
                gameStatus.started = true;

                if (gameStatus.isMultiplayer) {
                    player1 = document.querySelector('#Player1-name').value;
                    player2 = document.querySelector('#Player2-name').value;
                } else {
                    player1 = document.querySelector('#PlayerVsAI-name').value;
                    player2 = 'The Computer';
                }
            })
        })
    };

})();
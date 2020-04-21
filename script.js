const gameBoard = (() => {
    const boardCell = Array.from(document.querySelectorAll('td'));
    let player1;
    let player2;

    const buttons = (() => {
        reset = document.querySelector('.reset-btn button');
        humanGame = document.querySelector('#human-btn');
        AIGame = document.querySelector('#AI-btn');
        return {reset, humanGame, AIGame}
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
        return {x, o, winningCombos}
    })();

    const gameStatus = (() => {
        started = false;
        won = false;
        isMultiplayer = null;
        return {started, won, isMultiplayer} 
    })();
    
    function checkIfXWins() {
        if (plays.x.length < 3) {
          return;
        }
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
            document.querySelector('h2').innerText = `${player1} wins!`
            document.querySelector('h2').classList.remove('hidden');
            break;
          }
        }
    };

    function checkIfOWins() {
        if (plays.o.length < 3) {
          return;
        }
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
            document.querySelector('h2').innerText = `${player2} wins!`
            document.querySelector('h2').classList.remove('hidden');
            break;
          }
        }
    };

    boardCell.forEach( (cell) => {
        cell.addEventListener('click', function() {
            if (cell.innerText != '' || gameStatus.won || !gameStatus.started) {
                return;
            } else if (plays.last == null || plays.last == 'O') {
                cell.innerText = 'X'
                plays.last = 'X'
                plays.x.push(Number(cell.dataset.index));
                plays.x.sort();
            } else {
                cell.innerText = 'O'
                plays.last = 'O'
                plays.o.push(Number(cell.dataset.index));
                plays.o.sort();
            }
            checkIfXWins();
            checkIfOWins();
        })
    })

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

    })

    buttons.humanGame.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.multiplayer-game-input').classList.remove('hidden');
        gameStatus.isMultiplayer = true;
        startGame();
    })

    buttons.AIGame.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.AI-game-input').classList.remove('hidden');
        gameStatus.isMultiplayer = false;
        startGame();
    })

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
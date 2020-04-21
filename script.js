const gameBoard = (() => {
    const boardCell = Array.from(document.querySelectorAll('td'));
    const resetBtn = document.querySelector('.reset-btn button');
    const humanGameBtn = document.querySelector('#human-btn');
    const AIGameBtn = document.querySelector('#AI-btn');
    let lastCharacterPlayed;
    let xPlays = [];
    let oPlays = [];
    const winningPlays = [
        [0,1,2], //across top
        [3,4,5], //across middle
        [6,7,8], //across bottom
        [0,3,6], //left down
        [1,4,7], //middle down
        [2,5,8], //right down
        [0,4,8], //top left to bottom right
        [2,4,6] // top right to bottom left
    ]; //length == 8
    let gameStarted = false;
    let gameWon = false;
    
    function checkIfXWins() {
        if (xPlays.length < 3) {
          return;
        }
        for (let i = 0; i < winningPlays.length; i++) {
          let win = true;
          for (let j = 0; j < winningPlays[i].length; j++) {
            if (!xPlays.includes(winningPlays[i][j])) {
              win = false;
              break;
            }
          }
          if (win) {
            gameWon = true;
            console.log('x wins')
            break;
          }
        }
    };

    function checkIfOWins() {
        if (oPlays.length < 3) {
          return;
        }
        for (let i = 0; i < winningPlays.length; i++) {
          let win = true;
          for (let j = 0; j < winningPlays[i].length; j++) {
            if (!oPlays.includes(winningPlays[i][j])) {
              win = false;
              break;
            }
          }
          if (win) {
            gameWon = true;
            console.log('o wins')
            break;
          }
        }
    };

    boardCell.forEach( (cell) => {
        cell.addEventListener('click', function() {
            if (cell.innerText != '' || gameWon || !gameStarted) {
                return;
            } else if (lastCharacterPlayed == null || lastCharacterPlayed == 'O') {
                cell.innerText = 'X'
                lastCharacterPlayed = 'X'
                xPlays.push(Number(cell.dataset.index));
                xPlays.sort();
            } else {
                cell.innerText = 'O'
                lastCharacterPlayed = 'O'
                oPlays.push(Number(cell.dataset.index));
                oPlays.sort();
            }
            checkIfXWins();
            checkIfOWins();
        })
    })

    resetBtn.addEventListener('click', () => {
        boardCell.forEach( (cell) => {
            cell.innerText = '';
        })
        xPlays = [];
        oPlays = [];
        gameWon = false;
        lastCharacterPlayed = null;
        gameStarted = false;

        document.querySelector('.start-btns').classList.remove('hidden');
        document.querySelector('.multiplayer-game-input').classList.add('hidden');
        document.querySelector('.AI-game-input').classList.add('hidden');

    })

    humanGameBtn.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.multiplayer-game-input').classList.remove('hidden');

        startGame();
    })

    AIGameBtn.addEventListener('click', () => {
        document.querySelector('.start-btns').classList.add('hidden');
        document.querySelector('.AI-game-input').classList.remove('hidden');

        startGame();
    })

    const startGame = function () {
        const startGameBtn = document.querySelector('.start-game')
        startGameBtn.addEventListener('click', () => {
            document.querySelector('.start-btns').classList.add('hidden');
            document.querySelector('.multiplayer-game-input').classList.add('hidden');
            document.querySelector('.AI-game-input').classList.add('hidden');
            gameStarted = true;
        })
        
    };

})();
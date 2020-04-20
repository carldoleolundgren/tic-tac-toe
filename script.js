const gameBoard = (() => {
    const boardCell = Array.from(document.querySelectorAll('td'));
    const resetBtn = document.querySelector('.reset-btn button');
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
    let xWins = false;
    let oWins = false;
    
    function checkForWinner() {
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
            console.log('win');
            break;
          }
        }
    };

    var arraysMatch = function (arr1, arr2) {
    	if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
    	return true;
    };


    boardCell.forEach( (cell) => {
        cell.addEventListener('click', function() {
            if (cell.innerText != '') {
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
            checkForWinner();
        })
    })

    resetBtn.addEventListener('click', () => {
        boardCell.forEach( (cell) => {
            cell.innerText = '';
        })
        xPlays = [];
        oPlays = [];
        lastCharacterPlayed = null;
    })

    function evaluateWinner() {

    }
})();
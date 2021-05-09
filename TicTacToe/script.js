const statusDisplay = document.querySelector('.status');
const restartButtonDisplay = document.querySelector('.restart');

let gamePlay = true;
let players = ["X", "O"];
let currentPlayer = players[1];
let boardStatus = ["", "", "", "", "X", "", "", "", ""];
let statusMessage = {
    "winX": `X has won!`,
    "draw": `Game ended in a draw!`
};

const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5]
];

function PlayHere(CellId, nextStep) {
    if (boardStatus[CellId] !== "" || !gamePlay) return;
    boardStatus[CellId] = currentPlayer;
    document.querySelector(`.box[box-id='${CellId}']`).innerHTML = currentPlayer;
    ResultValidation(false);

    if (nextStep) {
        switchGame();
        computerPlay();
        switchGame();
    }
}

function ResultValidation(isMinimaxRun) {
    let winnerFound = false;
    let winner;

    for (let i = 0; i <= 6; i++) {
        const winCondition = winningConditions[i];
        let a = boardStatus[winCondition[0]];
        let b = boardStatus[winCondition[1]];
        let c = boardStatus[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            winner = a;
            winnerFound = true;
            break;
        }
    }

    if (winnerFound) {
        if (isMinimaxRun) {
            return winner;
        } else {
            statusDisplay.innerHTML = statusMessage[`win${winner}`];
            restartButtonDisplay.style.visibility = "visible";
            gamePlay = false;
            return;
        }
    }

    let noWinner = !boardStatus.includes("");
    if (noWinner) {
        if (isMinimaxRun) {
            return 'tie';
        } else {
            statusDisplay.innerHTML = statusMessage["draw"];
            restartButtonDisplay.style.visibility = "visible";
            gamePlay = false;
            return;
        }
    }

    if (isMinimaxRun) {
        return null;
    }
}

function switchGame() {
    currentPlayer = (currentPlayer === players[1]) ? players[0] : players[1];
}

function computerPlay() {
    let bestScore = -Infinity;
    let bestMoveCellId;

    for (let index = 0; index < 9; index++) {
        if (boardStatus[index] == "") {
            boardStatus[index] = players[0];
            let score = minimaxAlgorithm(boardStatus, 0, false);
            boardStatus[index] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMoveCellId = index;
            }
        }
    }

    PlayHere(bestMoveCellId, false);
}

let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimaxAlgorithm(boardStatus, depth, isMaximizing) {
    let result = ResultValidation(true);

    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let index = 0; index < 9; index++) {
            if (boardStatus[index] == "") {
                boardStatus[index] = players[0];
                let score = minimaxAlgorithm(boardStatus, depth + 1, false);
                boardStatus[index] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let index = 0; index < 9; index++) {
            if (boardStatus[index] == "") {
                boardStatus[index] = players[1];
                let score = minimaxAlgorithm(boardStatus, depth + 1, true);
                boardStatus[index] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
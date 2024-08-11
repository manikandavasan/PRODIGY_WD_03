const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] || checkWinner()) {
        return;
    }

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        resultDisplay.textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        resultDisplay.textContent = `It's a tie!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        resultDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    resultDisplay.textContent = 'Tic-Tac-Toe';
}
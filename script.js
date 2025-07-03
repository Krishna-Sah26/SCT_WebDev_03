const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  cell.innerText = currentPlayer;
  if (checkWin()) {
    document.getElementById('result').innerText = `${currentPlayer} wins!`;
    endGame();
  } else if (isDraw()) {
    document.getElementById('result').innerText = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const combos = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
  ];
  return combos.some(combo => {
    return combo.every(i => cells[i].innerText === currentPlayer);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText === 'X' || cell.innerText === 'O');
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  document.getElementById('result').innerText = '';
  currentPlayer = 'X';
}

const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const userInput = document.getElementById('fname');
const submitButton = document.getElementById('submit');
const welcomeBar = document.getElementById('welcome-bar');
const modal = document.getElementById('my-modal');
const gameOverModal = document.getElementById('game-over-modal');
const span = document.getElementsByClassName('close')[0];
const name = document.createElement('span');
const playAgainButton = document.getElementById('play-again');
const width = 10;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let finalScore = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

startButton.addEventListener('click', openModal);

function openModal() {
  modal.style.display = 'block';
}

span.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
}

window.addEventListener('click', closeModal2);

function closeModal2(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

playAgainButton.addEventListener('click', startGame);

function reAddFinalScore() {
  finalScore = score;
  finalScoreDisplay.textContent = finalScore;
}

function openGameOverModal() {
  gameOverModal.style.display = 'block';
  reAddFinalScore() 
}

function closeGameOverModal() {
  gameOverModal.style.display = 'none';
}

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add('snake'));

submitButton.addEventListener('click', displayUserName);

function displayUserName() {
  if (userInput.value) {
    name.textContent = userInput.value;
    welcomeBar.append(name);
    userInput.value = '';
    modal.style.display = 'none';
    greeting.style.display = 'block';
    startGame();
  }
}

const greeting = document.createElement('span');
greeting.textContent = 'Welcome, ';
welcomeBar.append(greeting);
greeting.classList.add('welcome');

function reAddScore() {
  score = 0;
  scoreDisplay.textContent = score;
}

function startGame() {
  closeModal();
  closeGameOverModal();
  currentSnake.forEach((index) => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  reAddScore();
  direction = 1;
  intervalTime = 1000;
  generateApple();
  currentSnake.forEach((index) => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || 
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId) || openGameOverModal();

  const tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    generateApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add('snake');
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}
generateApple();

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener('keyup', control);

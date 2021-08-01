'use strict';
let player1 = {
  playing: true,
  currentScore: 0,
  heldScore: 0,
  dom: {
    heldScore: document.querySelector('#score--0'),
    currentScore: document.querySelector('#current--0'),
  },
  addScore(score) {
    this.currentScore += score;
    this.dom.currentScore.textContent = this.currentScore;
  },
  resetScore() {
    this.currentScore = 0;
    this.dom.currentScore.textContent = 0;
  },
  select() {
    this.playing = true;
    document.querySelector('.player--0').classList.add('player--active');
  },
  deselect() {
    this.playing = false;
    document.querySelector('.player--0').classList.remove('player--active');
  },
};
let player2 = {
  playing: false,
  currentScore: 0,
  heldScore: 0,
  dom: {
    heldScore: document.querySelector('#score--1'),
    currentScore: document.querySelector('#current--1'),
  },
  addScore(score) {
    this.currentScore += score;
    this.dom.currentScore.textContent = this.currentScore;
  },
  resetScore() {
    this.currentScore = 0;
    this.dom.currentScore.textContent = 0;
  },
  select() {
    this.playing = true;
    document.querySelector('.player--1').classList.add('player--active');
  },
  deselect() {
    this.playing = false;
    document.querySelector('.player--1').classList.remove('player--active');
  },
};

const diceImage = document.querySelector('img');

function rollDice() {
  diceImage.style.display = 'block';
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `dice-${diceNumber}.png`;
  const activePlayer = player1.playing ? player1 : player2;
  if (diceNumber !== 1) {
    activePlayer.addScore(diceNumber);
  } else {
    activePlayer.resetScore();
    changePlayer();
  }
}

function changePlayer() {
  if (player1.playing) {
    player1.deselect();
    player2.select();
  } else {
    player2.deselect();
    player1.select();
  }
}

function hold() {
  const activePlayer = player1.playing ? player1 : player2;
  activePlayer.heldScore += activePlayer.currentScore;
  activePlayer.dom.heldScore.textContent = activePlayer.heldScore;
  activePlayer.resetScore();
  if (activePlayer.heldScore >= 100) {
    alert(`Player ${player1.playing ? '1' : '2'} has won`);
    return resetGame();
  }
  changePlayer();
}

function resetGame() {
  diceImage.style.display = 'none';
  player1.resetScore();
  player2.resetScore();
  player1.select();
  player2.deselect();
  player1.heldScore = 0;
  player2.heldScore = 0;
  player1.dom.heldScore.textContent = 0;
  player2.dom.heldScore.textContent = 0;
}

document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', resetGame);

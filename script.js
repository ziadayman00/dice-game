'use strict';

//score elements
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let newGame = document.querySelector('.btn--new');
let rollDice = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

// Variable declarations
let scores, currentScore, activePlayer, playing;
let winningScore = 100;

// Initial setup function
const init = function () {
  playing = true;

  // Reset scores and UI elements
  scores = [0, 0]; // Array to hold scores of both players
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset player states and UI
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Hide dice initially
  diceEl.classList.add('hidden');

  // Reset the current score and active player
  currentScore = 0;
  activePlayer = 0;
};
init(); // Call init to set everything up when the page loads

// Switch players function (called after a dice roll of 1)
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0; // Reset current score
  currentScore = 0; // Reset current score variable
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch active player
  player0El.classList.toggle('player--active'); // Toggle : if the class exest it remove it and if not it  add it
  player1El.classList.toggle('player--active'); 
};

// Roll dice event listener
rollDice.addEventListener('click', function () {
  if (playing) {
    // If the game is still active
    // Generate a random dice roll (between 1 and 6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // If dice is not 1, add to current score, else switch player
    if (dice !== 1) {
      currentScore += dice; // Add dice value to current score
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; // Update UI
    } else {
      switchPlayer(); // Switch to the next player
    }
  }
});

// Hold button event listener
btnHold.addEventListener('click', function () {
  if (playing) {
    // If the game is still active
    scores[activePlayer] += currentScore; // Add current score to total score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]; // Update UI with new score
    // If the active player reaches the winning score
    if (scores[activePlayer] >= winningScore) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // Remove active class
      diceEl.classList.add('hidden'); // Hide the dice
      playing = false; // Stop the game
    } else {
      switchPlayer(); // Switch to the next player
    }
  }
});

// New game button event listener
newGame.addEventListener('click', init); // Reset everything and start a new game

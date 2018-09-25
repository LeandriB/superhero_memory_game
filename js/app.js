// Array of images that will be used for card icons
var icons = [{
    'name': 'black_panther',
    'image': 'img/black_panther.png',
  },
  {
    'name': 'black_widow',
    'image': 'img/black_widow.png',
  },
  {
    'name': 'captain_america',
    'image': 'img/captain_america.png',
  },
  {
    'name': 'deadpool',
    'image': 'img/deadpool.png',
  },
  {
    'name': 'hulk',
    'image': 'img/hulk.png',
  },
  {
    'name': 'iron_man',
    'image': 'img/iron_man.png',
  },
  {
    'name': 'spiderman',
    'image': 'img/spiderman.png',
  },
  {
    'name': 'thor',
    'image': 'img/thor.png',
  },
];

// Declaration of variables

var firstCard = '';
var secondCard = '';
var cards = 0;
var moves = 0;
var counter = '';
var delay = 1000;
var stars = 3;
var interval;
var seconds = 0
var minutes = 0;
var timer = document.querySelector('.timer');
var deck = document.getElementById('deck');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
deck.appendChild(grid);

// @description Executes startGame function on page load

document.body.onload = startGame();

// @description Function to create and shuffle cards

function createCard() {
  // Doubles the cards in the array and shuffles it
  let deckGrid = icons.concat(icons).sort(function () {
    return 0.5 - Math.random();
    });
    // Creates the cards and assigns a dataset to cards
    deckGrid.forEach(function (icon) {
    let name = icon.name;
    let image = icon.image;

    let card = document.createElement('div');
    card.classList.add('card');
    // Allows dataset from array to be named
    card.dataset.name = name;

    let front = document.createElement('div');
    front.classList.add('front');

    let back = document.createElement('div');
    back.classList.add('back');
    // Allows for images to be added to each card.
    back.style.backgroundImage = 'url(' + image + ')';
    // Allows cards to be distributed to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}


/* @description Creates event listener for click event.
*               Does not allow unwanted click on deck.
*               Datasets are compared in order to determine match.
*/

grid.addEventListener('click', function (event) {
  let clicked = event.target;


  if ( clicked.parentNode.classList.contains('card') &&
  !( clicked.parentNode.classList.contains('open')) &&
  !( clicked.parentNode.classList.contains('matched'))) {

    if (cards < 2) {
      // Calls moveCounter function to increment moves on first click
      moveCounter();
      cards++;
      if (cards === 1) {
        firstCard = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('open');
      } else {
        secondCard = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('open');
      }
      if (firstCard && secondCard) {
        // Compares first clicked card with second clicked card
        if (firstCard === secondCard) {
          // Adds matched class if dataset matches
          setTimeout(matchedCard, delay);
        }
        // Resets classes on cards that don't match
        setTimeout(resetCards, delay);
       }
      }
    }
  });

/* @description Function to start timer that keeps track of player,
  *             until all cards are matched
*/

  function startTimer(){
    interval = setInterval(function() {
      timer.innerHTML = minutes + ' mins ' + seconds + ' secs';
      seconds++;
      if (seconds === 60){
        minutes++;
        seconds = 0;
      }
    }, delay);
  }

// @description Function to keep track of player moves throughout game

function moveCounter() {
  moves++;
  counter = moves;
  if (moves === 1) {
    seconds = 0;
    minutes = 0;
    // Calls startTimer function
    startTimer();
   }
  // Calls starRating function
  starRating();
 }

// @description Function to match cards under certain conditions

 function matchedCard() {
   var open = document.querySelectorAll('.open');
   open.forEach(function (card) {
     // Adds class 'matched' and 'rubberBand' to card
     card.classList.add('matched', 'rubberBand');
   });
   // Calls matchCounter function inside matchedCard to check if conditions are met
   matchCounter();
 };

/* @description Function to keep track of matched cards in order to
*               determine when game is over. This also calls the stopTimer
*               function when all 16 cards are matched
*/
 function matchCounter() {
  const matchCounter = document.getElementsByClassName('matched');
  if (matchCounter.length === 16) {
    // Calls stopTimer function
    stopTimer();
  }
}

/* @description Function to keep track of moves and update star rating.
*               If more than a spefic number of moves are made, a star
*               is removed.
*/

function starRating() {
  if (moves === 1) {
    // Allows the word move to turn into the word moves on more than 1 click
    $('#textMoves').text(' Move');
  } else {
    $('#textMoves').text(' Moves');
  }
  $('#moves').text(moves.toString());
  // Conditions under which stars are removed
  if (moves <= 28) {
    stars = stars;
  } else if (moves > 28 && moves <= 36) {
    $('#starOne').removeClass('fa-star');
    stars = '2';
  } else if (moves > 36) {
    $('#starTwo').removeClass('fa-star');
    stars = '1';
 }
}

// @description Function to reset cards if they don't have the same dataset

const resetCards = function resetCards() {
  firstCard = '';
  secondCard = '';
  cards = 0;

  let open = document.querySelectorAll('.open');
  open.forEach(function (card) {
    // Removes the class 'open' from cards
    card.classList.remove('open');
  });
 };

// @description Function to stop timer by clearing interval in startTimer

 function stopTimer() {
   clearInterval(interval);
   // Call modalPopUp function when timer is stopped
   modalPopUp();
 }


// @description Modal function that pops up when player completes game

function modalPopUp() {
  let modal = document.getElementById('winModal');
  let span = document.getElementsByClassName('close')[0];
  finalTime = timer.innerHTML;

  // Shows moves, star rating and player time on modal
  document.getElementById("movesTotal").innerHTML = moves;
  document.getElementById("starsTotal").innerHTML = stars;
  document.getElementById("timeTotal").innerHTML = finalTime;

  modal.style.display = 'block';
  // Closes modal when clicking on X
  span.onclick = function() {
    modal.style.display = 'none';
  }

  // Resets the game when player clicks on playAgainButton in modal
  $("#tryAgainButton").on("click", function() {
    location.reload()
  });
}

// @description Call all necessary functions to initiate game

function startGame() {
  createCard();
  matchedCard();
  startTimer();

  // Reset timer on game load
   seconds = 0;
   minutes = 0;
   timer = document.querySelector('.timer');
   timer.innerHTML = "0 mins 0 secs";
   clearInterval(interval);
}

// Function to reset the game on 'reload' icon click

function restartGame() {
  $("#reset").on("click", function() {
      location.reload()
  });
}

restartGame();

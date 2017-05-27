window.onload = function() {
  var playButton = document.getElementById('play-memorize');
  if (playButton.innerHTML == 'PLAY') {
    playButton.onclick = playGame;
  }
  var cellsClick = document.querySelectorAll('.cell, .active');
  for (var i = 0; i < cellsClick.length; i++) {
    cellsClick[i].onclick = checkUserInput;
  }
  //document.addEventListener("keydown", moveListeners);
};

function showSequence() {
  gameNumbers.board.forEach(function(row, rowIndex) {
    row.forEach(function(cell, cellIndex) {
      if (cell !== null) {
        var numberContainer = document.getElementById(rowIndex + "-" + cellIndex);
        numberContainer.classList.add("active");
        numberContainer.innerHTML = cell;
      }
    });
  });
}

function blankSequence() {
  gameNumbers.board.forEach(function(row, rowIndex) {
    row.forEach(function(cell, cellIndex) {
      if (cell !== null) {
        var numberContainer = document.getElementById(rowIndex + "-" + cellIndex);
        numberContainer.classList.add("tachon");
      }
    });
  });
}

function checkUserInput() {
  var discoveredNumber = this.innerHTML;
  if (discoveredNumber == gameNumbers.sequence[gameNumbers.numberClicks]) {
    this.classList.remove("tachon");
  } else {
    this.classList.remove("tachon");
    this.classList.add("error");
    this.innerHTML = "X";
    if (gameNumbers.attemptsLeft > 1) {
      timeoutPrevLevel = setTimeout(prevLevel, 1000);
    } else {
      timeoutGameOver = setTimeout(gameOver, 1000);
    }
  }
  gameNumbers._increaseClicks();

  if (gameNumbers.numberClicks == gameNumbers.lengthSequence && gameNumbers.attemptsLeft > 1) {
    nextLevel();
  }
}

function nextLevel() {
  gameNumbers._increaseLevel();
  document.getElementById('value-level').innerHTML = gameNumbers.level;
  gameNumbers._generateSequence();
  gameNumbers._shuffleBoard();
  cleanNotebook();
  countDown();
}

function prevLevel() {
  gameNumbers._decreaseAttemptsLeft();
  document.getElementById('value-attempts').innerHTML = gameNumbers.attemptsLeft;
  if (gameNumbers.level > 1) {
    gameNumbers._decreaseLevel();
  }
  document.getElementById('value-level').innerHTML = gameNumbers.level;
  gameNumbers._resetNumberClicks();
  gameNumbers._generateSequence();
  gameNumbers._shuffleBoard();
  cleanNotebook();
  countDown();
}

function brainAge() {

}


function playGame() {
  gameNumbers = new GameMemorizeNumbers();
  gameNumbers._generateSequence();
  gameNumbers._shuffleBoard();
  cleanNotebook();
  countDown();
  var playButton = document.getElementById('play-memorize');
  playButton.innerHTML = "QUIT";
}

function cleanNotebook() {
  var gameOverDiv = document.querySelector('.game-over');
  gameOverDiv.classList.remove("active");
  gameNumbers.board.forEach(function(row, rowIndex) {
    row.forEach(function(cell, cellIndex) {
      var numberContainer = document.getElementById(rowIndex + "-" + cellIndex);
      numberContainer.classList.remove('active');
      numberContainer.classList.remove('tachon');
      numberContainer.classList.remove('error');
      numberContainer.innerHTML = '';
    });
  });
}

function countDown() {
  var countDownDiv = document.querySelector('.countdown');
  var seconds = countDownDiv.innerHTML;
  countDownDiv.classList.add('active');
  if (seconds == 1) {
    countDownDiv.classList.remove('active');
    //temp = document.getElementById('countdown');
    countDownDiv.innerHTML = 4;
    showSequence();
    timeoutMemorize = setTimeout(blankSequence, 2000);
    return;
  }
  seconds--;
  //temp = document.getElementsByClassName('countdown');
  countDownDiv.innerHTML = seconds;
  timeoutCountDown = setTimeout(countDown, 1000);
}

function gameOver() {
  cleanNotebook();
  var playButton = document.getElementById('play-memorize');
  playButton.innerHTML = 'PLAY';
  var gameOverDiv = document.querySelector('.game-over');
  gameOverDiv.classList.add('active');
}

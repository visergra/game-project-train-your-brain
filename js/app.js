window.onload = function() {
  var playButton = document.getElementById('play');
  playButton.onclick = playGame;
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
  }
  else {
    this.classList.remove("tachon");
    this.classList.add("error");
    this.innerHTML = "X";
  }
  gameNumbers._increaseClicks();
}

function nextLevel() {

}

function brainAge() {

}

function playGame() {
  gameNumbers = new GameMemorizeNumbers();
  gameNumbers._generateSequence();
  gameNumbers._shuffleBoard();
  cleanNotebook();
  countDown();
}

function cleanNotebook() {
  gameNumbers.board.forEach(function(row, rowIndex) {
    row.forEach(function(cell, cellIndex) {
      var numberContainer = document.getElementById(rowIndex + "-" + cellIndex);
      numberContainer.classList.remove("active");
      numberContainer.classList.remove("tachon");
      numberContainer.classList.remove("error");
      numberContainer.innerHTML = "";
    });
  });
}

function countDown() {
  var countDownDiv = document.querySelector('.countdown');
  var seconds = countDownDiv.innerHTML;
  countDownDiv.classList.add("active");
  if (seconds == 1) {
    countDownDiv.classList.remove("active");
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

}

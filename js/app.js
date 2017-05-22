window.onload = function() {
  var playButton = document.getElementById('play');
  playButton.onclick = playGame;
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

function checkUserInput() {
  gameNumbers.numClicks += 1;
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
    return;
  }
  seconds--;
  //temp = document.getElementsByClassName('countdown');
  countDownDiv.innerHTML = seconds;
  timeoutCountDown = setTimeout(countDown, 1000);
}

function gameOver() {

}

window.onload = function() {
  var playButton = document.getElementById('play-maths');
  if (playButton.innerHTML == 'PLAY') {
    playButton.onclick = playGame;
  }
  var cellsClickNumber = document.querySelectorAll('.cell-number');
  for (var i = 0; i < cellsClickNumber.length; i++) {
    cellsClickNumber[i].onclick = writeResult;
  }

  var cellsClickDel = document.querySelectorAll('.cell-del');
  cellsClickDel[0].onclick = deleteResult;

  var cellsClickSend = document.querySelectorAll('.cell-send');
  cellsClickSend[0].onclick = checkUserInput;
};

function writeResult() {
  document.getElementsByClassName('input-result')[0].innerHTML += this.innerHTML;
}

function deleteResult() {
  document.getElementsByClassName('input-result')[0].innerHTML = null;
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
  gameMaths = new GameMentalMaths();
  countDown();
  //generateInitialLevel()
  var playButton = document.getElementById('play-maths');
  playButton.innerHTML = "QUIT";
}

function generateInitialLevel() {
  gameMaths.actualValue = _.random(1, 9);
  var activeOperationObj = gameMaths._getRandomOperation(gameMaths.actualValue);
  var queue1OperationObj = gameMaths._getRandomOperation(activeOperationObj.result);
  var queue2OperationObj = gameMaths._getRandomOperation(queue1OperationObj.result);

  storeOperations(activeOperationObj, queue1OperationObj, queue2OperationObj);
  visualizeElements(activeOperationObj, queue1OperationObj, queue2OperationObj);
}

function visualizeElements (activeOperationObj, queue1OperationObj, queue2OperationObj) {
  document.getElementById('active-value1').innerHTML = gameMaths.actualValue;
  document.getElementById('active-value2').innerHTML = activeOperationObj.value2;
  document.getElementById('active-operator').innerHTML = activeOperationObj.operator;
  document.getElementById('queue1-value').innerHTML = queue1OperationObj.value2;
  document.getElementById('queue1-operator').innerHTML = queue1OperationObj.operator;
  document.getElementById('queue2-value').innerHTML = queue2OperationObj.value2;
  document.getElementById('queue2-operator').innerHTML = queue2OperationObj.operator;
  document.getElementsByClassName('active-operation')[0].classList.add('active');
  document.getElementsByClassName('queue1-operation')[0].classList.add('active');
  document.getElementsByClassName('queue2-operation')[0].classList.add('active');
  document.getElementsByClassName('arrow-div')[0].classList.add('active');
  document.getElementsByClassName('input-result')[0].classList.add('active');
  var cellNumber = document.querySelectorAll('.cell-number, .cell-send, .cell-del');
  cellNumber.forEach(function(value) {
    value.classList.add('active');
  });
}

function storeOperations (activeOperationObj, queue1OperationObj, queue2OperationObj) {
  gameMaths._storeActiveOperation(activeOperationObj.value2, activeOperationObj.operator, activeOperationObj.result);
  gameMaths._storeQueue1Operation(queue1OperationObj.value2, queue1OperationObj.operator);
  gameMaths._storeQueue2Operation(queue2OperationObj.value2, queue2OperationObj.operator);
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
    generateInitialLevel();
    //timeoutMaths = setTimeout(blankSequence, 2000);
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

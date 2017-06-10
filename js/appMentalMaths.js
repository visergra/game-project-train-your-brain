window.onload = function() {
  var timeoutRound;
  var playButton = document.getElementById('play-maths');
  playButton.onclick = playOrQuit;

  var cellsClickNumber = document.querySelectorAll('.cell-number');
  for (var i = 0; i < cellsClickNumber.length; i++) {
    cellsClickNumber[i].onclick = writeResult;
  }

  var cellsClickDel = document.querySelectorAll('.cell-del');
  cellsClickDel[0].onclick = deleteResult;

  var cellsClickSend = document.querySelectorAll('.cell-send');
  cellsClickSend[0].onclick = checkUserInput;
};

function playOrQuit() {
  var playButton = document.getElementById('play-maths');
  if (playButton.innerHTML == 'PLAY') {
    playGame();
  } else {
    quitGame();
  }
};

function playGame() {
  gameMaths = new GameMentalMaths();
  countDown();
  //generateInitialLevel()
  var gameOverDiv = document.querySelector('.game-over');
  gameOverDiv.classList.remove('active');
  var playButton = document.getElementById('play-maths');
  playButton.innerHTML = "QUIT";
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

function timerRound() {
  timeoutRound = setTimeout(resultIncorrect, 5000);
}

function generateInitialLevel() {
  gameMaths.actualValue = _.random(1, 9);
  var activeOperationObj = gameMaths._getRandomOperation(gameMaths.actualValue);
  var queue1OperationObj = gameMaths._getRandomOperation(activeOperationObj.result);
  var queue2OperationObj = gameMaths._getRandomOperation(queue1OperationObj.result);
  storeOperations(activeOperationObj, queue1OperationObj, queue2OperationObj);
  visualizeInitialElements(activeOperationObj, queue1OperationObj, queue2OperationObj);
  timerRound();
}

function writeResult() {
  document.getElementsByClassName('input-result')[0].innerHTML += this.innerHTML;
}

function deleteResult() {
  document.getElementsByClassName('input-result')[0].innerHTML = null;
}

function checkUserInput() {
  clearTimeout(timeoutRound);
  if (document.getElementsByClassName('input-result')[0].innerHTML == gameMaths.actualResult) {
    resultCorrect();
  } else {
    resultIncorrect();
  }
}

function checkNextLevel() {
  gameMaths._updateLevel();
  document.getElementById('value-level').innerHTML = gameMaths.level;
}

function resultIncorrect() {
  if (gameMaths.attemptsLeft > 1) {
    gameMaths._decreaseAttemptsLeft();
    deleteResult();
    document.getElementById('value-attempts').innerHTML = gameMaths.attemptsLeft;
    generateInitialLevel();
  } else {
    gameOver();
  }
}

function resultCorrect() {
  cancelTimer = true;
  nextRound();
  gameMaths._increaseScore();
  checkNextLevel();
}

function nextRound() {
  var activeOperationObj = {
    operator: gameMaths.queue1Operator,
    value2: gameMaths.queue1Value,
    result: gameMaths.queue1Result
  };
  var queue1OperationObj = {
    operator: gameMaths.queue2Operator,
    value2: gameMaths.queue2Value,
    result: gameMaths.queue2Result
  };
  var queue2OperationObj = gameMaths._getRandomOperation(gameMaths.queue2Result);
  storeOperations(activeOperationObj, queue1OperationObj, queue2OperationObj);
  deleteResult();
  visualizeRoundElements(activeOperationObj, queue1OperationObj, queue2OperationObj);
  timerRound();
}

function brainAge() {
 if (gameMaths.level > 0 && gameMaths.level < 5) {
  document.getElementById('brain-age').innerHTML = "You should train more";
} else if (gameMaths.level >= 5 && gameMaths.level <= 7) {
  document.getElementById('brain-age').innerHTML = "Your brain is in good shape";
} else if (gameMaths.level > 7) {
  document.getElementById('brain-age').innerHTML = "Your brain is like Einstein 's!";
}
}
function visualizeInitialElements(activeOperationObj, queue1OperationObj, queue2OperationObj) {
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

function visualizeRoundElements(activeOperationObj, queue1OperationObj, queue2OperationObj) {
  document.getElementById('active-value1').innerHTML = null;
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

function storeOperations(activeOperationObj, queue1OperationObj, queue2OperationObj) {
  gameMaths._storeActiveOperation(activeOperationObj.value2, activeOperationObj.operator, activeOperationObj.result);
  gameMaths._storeQueue1Operation(queue1OperationObj.value2, queue1OperationObj.operator, queue1OperationObj.result);
  gameMaths._storeQueue2Operation(queue2OperationObj.value2, queue2OperationObj.operator, queue2OperationObj.result);
}

function cleanNotebook() {
  document.getElementsByClassName('active-operation')[0].classList.remove('active');
  document.getElementsByClassName('queue1-operation')[0].classList.remove('active');
  document.getElementsByClassName('queue2-operation')[0].classList.remove('active');
  document.getElementsByClassName('arrow-div')[0].classList.remove('active');
  document.getElementsByClassName('input-result')[0].classList.remove('active');
  var cellNumber = document.querySelectorAll('.cell-number, .cell-send, .cell-del');
  cellNumber.forEach(function(value) {
    value.classList.remove('active');
  });
}

function gameOver() {
  cleanNotebook();
  var playButton = document.getElementById('play-maths');
  playButton.innerHTML = 'PLAY';
  var gameOverDiv = document.querySelector('.game-over');
  gameOverDiv.classList.add('active');
  brainAge();
}

function quitGame() {
  window.location.href = 'index.html';
}

function GameMemorizeNumbers() {
  this.actualValue = 0;
  this.activeOperator = ''
  this.activeValue2 = 0;
  this.queue1Operator = '';
  this.queue1Value = 0;
  this.queue2Operator = '';
  this.queue2Value = 0;
  this.level = 1;
  this.attemptsLeft = 3;
  this.score = 0;
  this.gameOver = false;
}

GameMemorizeNumbers.prototype._getRandomOperation = function(value1) {
  var randomOperation = {
    operator: '',
    value2: 0,
    result: 0
  };
  var validOperation = false;
  while (validOperation === false) {
    var operator = _.sample(['+', '-', '/', '*']);
    var value2 = _.random(1, 9);
    var tmpResult = this._doOperation(value1, value2, operator);

    if (_.isInteger(tmpResult)){
      validOperation = true;
      randomOperation.operator = operator;
      randomOperation.value2 = value2;
      randomOperation.result = tmpResult;
      return randomOperation;
    }
  }
};

GameMemorizeNumbers.prototype._doOperation = function(value1, value2, operator) {
  if (operator == '+') {
    return value1 + value2;
  } else if (operator == '-') {
    return value1 - value2;
  } else if (operator == '*') {
    return value1 * value2;
  } else if (operator == '/') {
    return value1 / value2;
  }
};

GameMemorizeNumbers.prototype._decreaseAttemptsLeft = function() {
  this.attemptsLeft -= 1;
};

GameMemorizeNumbers.prototype._increaseLevel = function() {
  this.level += 1;
};

GameMemorizeNumbers.prototype._decreaseLevel = function() {
  this.level -= 1;
};

GameMemorizeNumbers.prototype._resetGame = function() {
  this.level = 1;
  this.attemptsLeft = 3;
  this.score = 0;
  this.gameOver = false;
};

GameMemorizeNumbers.prototype._checkGameOver = function() {
  if (this.attemptsLeft === 0) {
    this.gameOver = true;
  }
};

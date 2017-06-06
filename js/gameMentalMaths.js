function GameMentalMaths() {
  this.actualResult = 0;
  this.actualValue = 0;
  this.activeOperator = ''
  this.activeValue2 = 0;
  this.queue1Operator = '';
  this.queue1Value = 0;
  this.queue1Result = 0;
  this.queue2Operator = '';
  this.queue2Value = 0;
  this.queue2Result = 0;
  this.level = 1;
  this.attemptsLeft = 3;
  this.score = 0;
  this.gameOver = false;
}

GameMentalMaths.prototype._storeActiveOperation = function(value2, operator, result) {
  this.actualResult = result;
  this.activeOperator = operator;
  this.activeValue2 = value2;
};

GameMentalMaths.prototype._storeQueue1Operation = function(value2, operator, result) {
  this.queue1Value = value2;
  this.queue1Operator = operator;
  this.queue1Result = result;
};

GameMentalMaths.prototype._storeQueue2Operation = function(value2, operator, result) {
  this.queue2Value = value2;
  this.queue2Operator = operator;
  this.queue2Result = result;
};

    GameMentalMaths.prototype._getRandomOperation = function(value1) {
      var randomOperation = {
        operator: '',
        value2: 0,
        result: 0
      };
      var validOperation = false;
      while (validOperation === false) {
        var operator = _.sample(['&#43;', '&#8722;', '&#247;', '&#215;']);
        var value2 = _.random(1, 9);
        var tmpResult = this._doOperation(value1, value2, operator);

        if (_.isInteger(tmpResult) && tmpResult > 0 && tmpResult <= 25) {
          validOperation = true;
          randomOperation.operator = operator;
          randomOperation.value2 = value2;
          randomOperation.result = tmpResult;
          return randomOperation;
        }
      }
    };

    GameMentalMaths.prototype._doOperation = function(value1, value2, operator) {
      if (operator == '&#43;') {
        return value1 + value2;
      } else if (operator == '&#8722;') {
        return value1 - value2;
      } else if (operator == '&#215;') {
        return value1 * value2;
      } else if (operator == '&#247;') {
        return value1 / value2;
      }
    };

    GameMentalMaths.prototype._increaseScore = function() {
      this.score += 1;
    };

    GameMentalMaths.prototype._decreaseAttemptsLeft = function() {
      this.attemptsLeft -= 1;
    };

    GameMentalMaths.prototype._updateLevel = function() {
      this.level = Math.floor(this.score / 3) + 1;
    };

    GameMentalMaths.prototype._resetGame = function() {
      this.level = 1;
      this.attemptsLeft = 3;
      this.score = 0;
      this.gameOver = false;
    };

    GameMentalMaths.prototype._checkGameOver = function() {
      if (this.attemptsLeft === 0) {
        this.gameOver = true;
      }
    };

function GameMemorizeNumbers() {
  this.board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  this.maxSequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  this.sequence = [];
  this.level = 1;
  this.lengthSequence = this.level + 2;
  this.numberClicks = 0;
  this.attemptsLeft = 3;
  this.score = 0;
  this.gameOver = false;
}

GameMemorizeNumbers.prototype._generateSequence = function() {
  var randomSequence = _.sampleSize(this.maxSequence, this.lengthSequence);
  this.sequence = randomSequence.sort();
};


GameMemorizeNumbers.prototype._shuffleBoard = function() {
  var flattenedBoard = _.concat(gameNumbers.sequence, _.fill(Array((Math.pow(this.board.length, 2)) - this.lengthSequence), null));
  this.board = _.chunk(_.shuffle(flattenedBoard), this.board.length);
};

GameMemorizeNumbers.prototype._decreaseAttemptsLeft = function() {
  this.attemptsLeft -= 1;
};

GameMemorizeNumbers.prototype._increaseLevel = function() {
  this.level += 1;
  this.resetNumberClicks();
};

GameMemorizeNumbers.prototype._resetNumberClicks = function() {
  this.numberClicks = 0;
};

GameMemorizeNumbers.prototype._increaseClicks = function() {
  this.numberClicks += 1;
};

GameMemorizeNumbers.prototype._resetGame = function() {
  this.sequence = [];
  this.numberClicks = 0;
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

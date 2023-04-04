export class GenericUnit {
  x = -1;
  y = -1;
  movement = 1;
  movesUsed = 0;

  constructor(X, Y, movement) {
    this.x = X;
    this.y = Y;
    this.movement = movement;
  }
  getMovesLeft() {
    return this.movement - this.movesUsed;
  }
  incrementMoveUsed() {
    this.movesUsed++;
  }
  resetMoves() {
    this.movesUsed = 0;
  }

}

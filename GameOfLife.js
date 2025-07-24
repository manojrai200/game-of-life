class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    const board = [];
    for (let row = 0; row < this.height; row++) {
      board.push(new Array(this.width).fill(0));
    }
    return board;
  }

  inBounds(row, col) {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  getCell(row, col) {
    row = Number(row);
    col = Number(col);
    return this.inBounds(row, col) ? this.board[row][col] : 0;
  }

  setCell(value, row, col) {
    row = Number(row);
    col = Number(col);
    if (this.inBounds(row, col)) {
      this.board[row][col] = value;
    }
  }

  toggleCell(row, col) {
    row = Number(row);
    col = Number(col);
    if (this.inBounds(row, col)) {
      this.board[row][col] = this.board[row][col] === 1 ? 0 : 1;
    }
  }

  forEachCell(callback) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        callback(row, col);
      }
    }
  }

  livingNeighbors(row, col) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    let count = 0;
    for (const [dx, dy] of directions) {
      const r = Number(row) + dx;
      const c = Number(col) + dy;
      if (this.inBounds(r, c)) {
        count += this.board[r][c];
      }
    }
    return count;
  }

  tick() {
    const newBoard = this.makeBoard();
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const alive = this.board[row][col];
        const neighbors = this.livingNeighbors(row, col);
        if (alive === 1) {
          newBoard[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          newBoard[row][col] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    this.board = newBoard;
  }
}

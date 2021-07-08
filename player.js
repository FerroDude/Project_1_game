class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
  }
  paint() {
    const context = this.game.context;
    context.fillStyle = 'grey';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

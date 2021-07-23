class Wall {
  constructor(game, x, y, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = canvas.width / 30;
    this.height = height;
    this.color = 'black';
    this.type = 'wall';
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

class Wall {
  constructor(game, x, y, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = canvas.width / 20;
    this.height = height;
    this.color = 'black';
    this.x2 = this.x + this.width;
    this.y2 = this.x + this.height;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

class Floor {
  constructor(game, x, y, width) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = canvas.height / 20;
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

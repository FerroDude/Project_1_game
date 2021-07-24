class UnportableFloor {
  constructor(game, x, y, width) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = canvas.height / 30;
    this.color = 'grey';
    this.portable = false;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

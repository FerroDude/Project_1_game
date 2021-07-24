class Exit {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 90;
    this.color = 'brown';
  }
  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.fillRect(
      this.x + this.width / 2.2,
      this.y,
      this.width / 10,
      this.height
    );
    context.restore();
  }
}

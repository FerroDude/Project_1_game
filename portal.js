class Portal {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.color = 'blue';
  }

  runLogic() {
    this.x += 2;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

class Portal {
  constructor(game, x, y, angle) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.directionX = 0;
    this.directionY = 0;
    this.width = 20;
    this.height = 20;
    this.color = 'green';
    this.angle = angle;
    this.dx = Math.cos(angle) * 10;
    this.dy = Math.sin(angle) * 10;
  }

  runLogic() {
    this.x += this.dx;
    this.y += this.dy;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x + 15, this.y + 20, this.width, this.height);
    context.restore();
  }
}

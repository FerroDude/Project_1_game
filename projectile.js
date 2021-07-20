class Projectile {
  constructor(game, x, y, angle) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.directionX = 0;
    this.directionY = 0;
    this.width = 10;
    this.height = 10;
    this.color = 'green';
    this.angle = angle;
    this.dx = Math.cos(angle) * 5;
    this.dy = Math.sin(angle) * 5;
  }

  runLogic() {
    this.x += this.dx;
    this.y += this.dy;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

class PortalTwo {
  constructor(game, x, y, direction, hitWall) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 80;
    this.color = 'red';
    this.direction = direction;
    this.hitWall = hitWall;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    if (this.hitWall) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.hitWall === false) {
      context.fillRect(this.x, this.y, this.width + 70, this.height - 70);
    }
    context.restore();
  }
}

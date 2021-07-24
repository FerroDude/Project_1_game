class Portal {
  constructor(game, x, y, hitWall) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.color = 'green';
    this.hitWall = hitWall;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    if (this.hitWall) {
      this.width = 10;
      this.height = 80;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.hitWall === false) {
      this.width = 80;
      this.height = 10;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    context.restore();
  }
}

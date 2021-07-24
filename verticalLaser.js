class VerticalLaser {
  constructor(game) {
    this.game = game;
    this.x = 1;
    this.y = 0;
    this.speedX = 0.7;
    this.width = 5;
    this.height = canvas.height;
    this.color = 'red';
  }

  runLogic() {
    this.x += this.speedX;
    if (this.x > 1001 || this.x < -1) {
      this.speedX *= -1.4;
    }
  }
  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

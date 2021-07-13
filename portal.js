class Portal {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.directionX = 0;
    this.directionY = 0;
    this.width = 10;
    this.height = 10;
    this.color = 'green';
    this.angle;
  }

  runLogic() {
    this.x += 20;

    /*     this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
    this.x += this.directionX;
    this.y += this.directionY;

    window.onmousedown = (e) => {
      const x = mouseX - this.player.x;
      const y = mouseY - this.player.y;

      const distance = Math.sqrt(x * x + y * y);

      x = x / distance;
      y = y / distance;
      this.directionX = x * 10;
      this.directionY = y * 10;
    }; */
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x + 15, this.y + 20, this.width, this.height);
    context.restore();
  }
}

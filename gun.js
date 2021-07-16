class Gun {
  constructor(game, x, y, player) {
    this.game = game;
    this.player = player;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 15;
    this.color = 'red';
    this.angle = 100;
  }

  runLogic() {
    this.x = this.player.x;
    this.y = this.player.y;
  }

  rotateGun() {
    let angle = Math.atan2(
      this.game.mousePos.y - this.y,
      this.game.mousePos.x - this.x
    );
    this.game.context.translate(this.player.x + 23, this.player.y + 30);
    this.game.context.rotate(angle);
    this.game.context.translate(-this.player.x - 15, -this.player.y - 30);
  }

  paint() {
    const context = this.game.context;
    context.save();
    this.rotateGun();
    context.fillStyle = this.color;
    context.fillRect(this.x + 15, this.y + 20, this.width, this.height);
  }
}

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 3;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.width = 30;
    this.height = 50;
  }

  runLogic() {
    const friction = 0.1;
    const GRAVITY = 0.3;

    this.speedX += this.accelerationX;

    if (this.speedX > 0) {
      this.speedX -= friction;
    } else if (this.speedX < 0) {
      this.speedX += friction;
    }

    if (this.speedX > this.maxSpeed) {
      this.speedX = this.maxSpeed;
    } else if (this.speedX < -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    }
    this.speedY += GRAVITY;

    this.x += this.speedX;
    this.y += this.speedY * GRAVITY;

    //this.speedY += this.accelerationY; there is no up or down movement, except jump

    /*     if (this.speedX > 0) {
      this.speedX -= friction;
    } else if (this.speedX < 0) {
      this.speedX += friction;
    }
    this.x += this.speedX;
   */
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'grey';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

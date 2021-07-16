class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 8;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.GRAVITY = 1.3;
    this.width = 40;
    this.height = 60;
  }

  runLogic() {
    const friction = 0.2;

    this.speedX += this.accelerationX;
    //add friction to movement
    if (this.speedX > 0) {
      this.speedX -= friction;
    } else if (this.speedX < 0) {
      this.speedX += friction;
    }

    //Limit max speed
    if (this.speedX > this.maxSpeed) {
      this.speedX = this.maxSpeed;
    } else if (this.speedX < -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    }
    this.x += this.speedX;
    //add gravity
    this.speedY += this.GRAVITY;
    this.y += this.speedY;

    //collision with walls

    if (this.y + this.height > canvas.height) {
      this.speedY = 0;
      this.y = canvas.height - this.height;
    }
    if (this.x < 0) {
      this.speedX = 0;
      this.x = 0;
    }
    if (this.x > canvas.width - this.width) {
      this.speedX = 0;
      this.x = canvas.width - this.width;
    }
    if (this.y < 0) {
      this.speedY = 0;
      this.y = 0;
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'grey';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

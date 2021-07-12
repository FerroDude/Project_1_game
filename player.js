class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 5;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.GRAVITY = 0.6;
    this.width = 30;
    this.height = 50;
  }

  runLogic() {
    const friction = 0.3;


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
    this.speedY += this.GRAVITY;
    this.y += this.speedY * this.GRAVITY;

    this.x += this.speedX;


  //collision with walls
    if (this.y + this.height > canvas.height) {
       
        this.speedY = 0;
        this.y = canvas.height - this.height
       }
    if (this.x < 0) {
        this.speedX = 0;
        this.x = 0
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

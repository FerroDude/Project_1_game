class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedY = 1;
    this.speedX = 0;
    this.maxSpeed = 4;
    this.accelerationX = 0;
    this.accelerationY = 0;
    //this.GRAVITY = 0.3;
    this.width = 40;
    this.height = 60;
  }

  runLogic() {
    const friction = 0.01;
    const GRAVITY = 0.3;

    this.speedX += this.accelerationX;

    this.speedX = this.speedX / (1 + friction);

    //Limit max speed
    if (this.speedX > this.maxSpeed) {
      this.speedX = this.maxSpeed;
    } else if (this.speedX < -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    }

    // this.speedX = Math.max(Math.min(this.speedX, this.maxSpeed), -this.maxSpeed);

    //add gravity
    this.speedY += GRAVITY;

    //platform collisions
    const newY = this.y + this.speedY;

    let playerIsGoingToIntersectWithFloor = false;

    this.game.obstacles.forEach((obstacle) => {
      if (
        this.game.checkIntersection(obstacle, {
          x: this.x,
          y: newY,
          width: this.width,
          height: this.height
        })
      ) {
        playerIsGoingToIntersectWithFloor = true;
      }
    });
    if (playerIsGoingToIntersectWithFloor) {
      this.speedY = 0;
    } else {
      this.y = newY;
    }

    let playerIsGoingToIntersectWithWall = false;
    const newX = this.x + this.speedX;
    this.game.obstacles.forEach((obstacle) => {
      if (
        this.game.checkIntersection(obstacle, {
          x: newX,
          y: this.y,
          width: this.width,
          height: this.height
        })
      ) {
        playerIsGoingToIntersectWithWall = true;
      }
    });
    if (playerIsGoingToIntersectWithWall) {
      this.speedX = 0;
    } else {
      this.x = newX;
    }
    /*
    const playerIsGoingToIntersectWithObstacle = this.game.obstacles.some(obstacle => {
      return this.game.checkIntersection(obstacle, {
        x: this.x,
        y: newY,
        width: this.width,
        height: this.height
      });
    })
    */

    /*
    const values = [ 1, 'a', null ];
    const oneValueIsString = values.some((value) => typeof value === 'string');
    const allValuesAreString = values.every((value) => typeof value === 'string');
    */

    this.game.portalOne.forEach((portalOne) => {
      this.game.portalTwo.forEach((portalTwo) => {
        if (this.game.checkIntersection(this, portalOne)) {
          if (portalTwo.direction === 'left') {
            this.x = portalTwo.x - this.width;
            this.y = portalTwo.y;
          } else if (portalTwo.direction === 'right') {
            this.x = portalTwo.x + this.width;
            this.y = portalTwo.y;
          } else if (portalTwo.direction === 'up') {
            this.x = portalTwo.x;
            this.y = portalTwo.y - 60;
          } else if (portalTwo.direction === 'down') {
            this.x = portalTwo.x;
            this.y = portalTwo.y + 30;
          }
          this.game.closePortals();
        }
      });
    });

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

    // Iterate over each portal in this.game.portals
    // If player coordinates collide with portal coordinates,
    // get the other portal in the array of portals
    // if said portal exists,
    // get portal coordinates and set those to player's coordinates
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'grey';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

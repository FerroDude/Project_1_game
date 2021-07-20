class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Player(
      this,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.gun = new Gun(this, this.player.x, this.player.y, this.player);
    this.mousePos = {};
  }
  start() {
    this.projectiles = [];
    this.obstacles = [];
    this.createPlatforms();
    this.loop();
    this.enableControls();
  }

  createPlatforms() {
    this.obstacles.push(new Wall(this, 100, 100, 800));
    this.obstacles.push(new Floor(this, 100, 900, 200));
    this.obstacles.push(new Wall(this, 800, 400, 500));
  }
  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'KeyD':
          this.player.accelerationX += 1;
          break;
        case 'KeyA':
          this.player.accelerationX -= 1;
          break;
        case 'KeyW':
          if (this.player.speedY === 0) {
            this.player.speedY = -10;
          }
          break;
      }
    });
    window.addEventListener('keyup', (event) => {
      const key = event.code;
      switch (key) {
        case 'KeyD':
        case 'KeyA':
          this.player.accelerationX = 0;
          this.player.speedX = 0;
          break;
      }
    });
    window.addEventListener('click', (event) => {
      this.fireProjectile();
    });
  }

  /*   checkIntersection(elementOne, elementTwo) {
    return (
      elementOne.x + elementOne.width / 2 >=
        elementTwo.x - elementTwo.width / 2 &&
      elementOne.x - elementOne.width / 2 <=
        elementTwo.x + elementTwo.width / 2 &&
      elementOne.y + elementOne.height / 2 >=
        elementTwo.y - elementTwo.height / 2 &&
      elementOne.y - elementOne.height / 2 <=
        elementTwo.y + elementTwo.height / 2
    );
  } */

  checkIntersection(elementOne, elementTwo) {
    if (elementOne.x >= elementTwo.x + elementTwo.width) {
      return false;
    } else if (elementOne.x + elementOne.width <= elementTwo.x) {
      return false;
    } else if (elementOne.y >= elementTwo.y + elementTwo.height) {
      return false;
    } else if (elementOne.y + elementOne.height <= elementTwo.y) {
      return false;
    } else {
      return true;
    }
  }

  detectCollisions() {
    this.projectiles.forEach((projectile, index) => {
      this.obstacles.forEach((obstacle) => {
        if (this.checkIntersection(projectile, obstacle)) {
          this.projectiles.splice(index, 1);
        }
      });
    });

    /*
    this.obstacles.forEach((obstacle) => {
      if (this.checkIntersection(obstacle, this.player)) {
        this.player.speedY = 0;
      }
    });
    */
  }
  // Iterate over each projectile
  // Iterate over each wall
  // Detect if projectile and wall are colliding
  // if so, get projectile coordinates
  // remove projectile from projectiles array
  // create new Portal() with projectile coordinates

  fireProjectile() {
    const projectile = new Projectile(
      this,
      this.player.x + 15,
      this.player.y + 20,
      this.gun.angle
    );
    this.projectiles.push(projectile);
  }

  getMousePosition() {
    window.addEventListener('mousemove', (event) => {
      this.mousePos = {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop
      };
    });
  }

  runLogic() {
    this.detectCollisions();
    this.player.runLogic();
    this.getMousePosition();
    this.gun.runLogic();
    for (const projectile of this.projectiles) {
      projectile.runLogic();
    }

    console.log(this.player.speedY);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.paint();
      this.loop();
    });
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.clearScreen();
    this.player.paint();
    for (const obstacle of this.obstacles) {
      obstacle.paint();
    }
    for (const projectile of this.projectiles) {
      projectile.paint();
    }
    this.gun.paint();
    this.context.restore();
  }
}

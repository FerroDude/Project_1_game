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
    this.projectilesTwo = [];
    this.obstacles = [];
    this.portalOne = [];
    this.portalTwo = [];
    this.createPlatforms();
    this.loop();
    this.enableControls();
  }

  createPlatforms() {
    //borders
    this.obstacles.push(new Floor(this, 0, 0, canvas.width));
    this.obstacles.push(
      new Floor(this, 0, canvas.height - canvas.width / 30, canvas.width)
    );
    this.obstacles.push(new Wall(this, 0, 0, canvas.height));
    this.obstacles.push(
      new Wall(this, canvas.width - canvas.width / 30, 0, canvas.height)
    );
    //platforms
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
        case 'KeyE':
          this.fireProjectileTwo();
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

  //COLLISIONS
  detectCollisions() {
    //portal 1
    this.projectiles.forEach((projectile, index) => {
      this.obstacles.forEach((obstacle) => {
        if (this.checkIntersection(projectile, obstacle)) {
          if (obstacle.type === 'wall') {
            if (projectile.dx < 0) {
              this.portalOne.push(
                new Portal(this, projectile.x + 2, projectile.y, true)
              );
            }
            if (projectile.dx > 0) {
              this.portalOne.push(
                new Portal(this, projectile.x - 2, projectile.y, true)
              );
            }
            this.projectiles.splice(index, 1);
          }
          if (obstacle.type === 'floor') {
            if (projectile.dy < 0) {
              this.portalOne.push(
                new Portal(this, projectile.x, projectile.y + 2, false)
              );
            }
            if (projectile.dy > 0) {
              this.portalOne.push(
                new Portal(this, projectile.x, projectile.y - 2, false)
              );
            }
            this.projectiles.splice(index, 1);
          }
        }
      });
    });
    //Portal 2
    this.projectilesTwo.forEach((projectileTwo, index) => {
      this.obstacles.forEach((obstacle) => {
        if (this.checkIntersection(projectileTwo, obstacle)) {
          if (obstacle.type === 'wall') {
            if (projectileTwo.dx < 0) {
              this.portalTwo.push(
                new PortalTwo(
                  this,
                  projectileTwo.x + 4,
                  projectileTwo.y,
                  'right',
                  true
                )
              );
            }
            if (projectileTwo.dx > 0) {
              this.portalTwo.push(
                new PortalTwo(
                  this,
                  projectileTwo.x - 4,
                  projectileTwo.y,
                  'left',
                  true
                )
              );
            }
            this.projectilesTwo.splice(index, 1);
          }
          if (obstacle.type === 'floor') {
            if (projectileTwo.dy < 0) {
              this.portalTwo.push(
                new PortalTwo(
                  this,
                  projectileTwo.x,
                  projectileTwo.y + 2,
                  'down',
                  false
                )
              );
            }
            if (projectileTwo.dy > 0) {
              this.portalTwo.push(
                new PortalTwo(
                  this,
                  projectileTwo.x,
                  projectileTwo.y - 2,
                  'up',
                  false
                )
              );
            }
            this.projectilesTwo.splice(index, 1);
          }
        }
      });
    });
  }
  // Iterate over each projectile
  // Iterate over each wall
  // Detect if projectile and wall are colliding
  // if so, get projectile coordinates
  // remove projectile from projectiles array
  // create new Portal() with projectile coordinates

  closePortals() {
    this.portalOne = [];
    this.portalTwo = [];
  }

  fireProjectile() {
    const projectile = new Projectile(
      this,
      this.player.x + 15,
      this.player.y + 20,
      this.gun.angle
    );
    this.projectiles.push(projectile);
  }
  fireProjectileTwo() {
    const projectileTwo = new ProjectileTwo(
      this,
      this.player.x + 15,
      this.player.y + 20,
      this.gun.angle
    );
    this.projectilesTwo.push(projectileTwo);
  }

  portalsReset() {
    if (this.portalOne.length > 1) {
      this.portalOne.shift();
    }
    if (this.portalTwo.length > 1) {
      this.portalTwo.shift();
    }
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
    this.portalsReset();
    this.gun.runLogic();
    for (const projectile of this.projectiles) {
      projectile.runLogic();
    }
    for (const projectileTwo of this.projectilesTwo) {
      projectileTwo.runLogic();
    }
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
    for (const portalOne of this.portalOne) {
      portalOne.paint();
    }
    for (const portalTwo of this.portalTwo) {
      portalTwo.paint();
    }
    for (const obstacle of this.obstacles) {
      obstacle.paint();
    }
    for (const projectile of this.projectiles) {
      projectile.paint();
    }
    for (const projectileTwo of this.projectilesTwo) {
      projectileTwo.paint();
    }
    this.gun.paint();
    this.context.restore();
  }
}

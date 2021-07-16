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
    new Block(this, 600, 50, 100, 50);
  }
  start() {
    this.portals = [];
    this.loop();
    this.enableControls();
  }

  createPlatforms() {
    new Block(this, 600, 50, 100, 50);
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'KeyD':
          this.player.accelerationX += 1.3;
          break;
        case 'KeyA':
          this.player.accelerationX -= 1.3;
          break;
        case 'KeyW':
          if (this.player.speedY === 0) {
            this.player.speedY = -20;
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
      this.firePortal();
    });
  }

  firePortal() {
    const portal = new Portal(
      this,
      this.player.x + 2,
      this.player.y + 2,
      this.gun.angle
    );
    this.portals.push(portal);
  }

  getMousePosition() {
    canvas.addEventListener('mousemove', (event) => {
      this.mousePos = {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop
      };
    });
  }

  runLogic() {
    this.player.runLogic();
    this.getMousePosition();
    this.gun.runLogic();
    for (const portal of this.portals) {
      portal.runLogic();
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
    for (const portal of this.portals) {
      portal.paint();
    }
    this.gun.paint();
    this.context.restore();
  }
}

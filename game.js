class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Player(
      this,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }
  start() {
    this.projectiles = [];
    this.loop();
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          this.player.accelerationX += 1;
          break;
        case 'ArrowLeft':
          this.player.accelerationX -= 1;
          break;
        case 'ArrowUp':
          if (this.player.speedY === 0) {
            this.player.speedY = -20;
          }
          break;
        case 'Space':
          this.firePortal();
          break;
      }
    });
    window.addEventListener('keyup', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
        case 'ArrowLeft':
          this.player.accelerationX = 0;
          this.player.speedX = 0;
          break;
      }
    });
  }
  firePortal() {
    const projectile = new Portal(this, this.player.x, this.player.y);
    this.projectiles.push(projectile);
  }
  runLogic() {
    this.player.runLogic();
    for (const projectile of this.projectiles) {
      projectile.runLogic();
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
    for (const projectile of this.projectiles) {
      projectile.paint();
    }
  }
}

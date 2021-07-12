class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Player(this, this.canvas.width / 2, this.canvas.height / 2);
  }
  start() {
    //this.player = new Player(this, this.canvas.width / 2, canvas.height / 2);

    this.loop();
    this.enableControls();
  }

  enableControls() {
    //need to add keyup and maybe change how acceleration works
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
          this.player.speedY = -15;
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

  runLogic() {
    this.player.runLogic();
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
  }
}

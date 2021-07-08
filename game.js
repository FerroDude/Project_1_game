class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }
  start() {
    this.player = new Player(this, 0, this.canvas.height - );
    this.paint();
  }

  paint() {
    this.player.paint();
  }
}

(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      scene: [PlayGame]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor(config) {
      super(config);
    }
  }
  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
    }
    preload() {
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }
    create() {
      let points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400];
      let curve = new Phaser.Curves.Spline(points);
      let graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);
      //
      curve.draw(graphics);
      //
      graphics.fillStyle(0x00ff00, 1);
      //
      for (let i = 0; i < points.length; i++) {
        graphics.fillCircle(points[i].x, points[i].y, 6);
      }
      //
      let ball1 = this.add.follower(curve, 50, 350, 'ball');
      let ball2 = this.add.follower(curve, 50, 400, 'ball');
      let ball3 = this.add.follower(curve, 500, 450, 'ball');
      //
      // Providing just a number sets the duration for following the path
      ball1.startFollow(4000);
      ball2.startFollow(4000);
      ball3.startFollow(4000);
    }
    update() {}
    render() {}
  }

})();
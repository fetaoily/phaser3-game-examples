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
    constructor (config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor () {
      super();
      this.graphics = null;
      this.curve = null;
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      let p0 = new Phaser.Math.Vector2(100, 500);
      let p1 = new Phaser.Math.Vector2(50, 100);
      let p2 = new Phaser.Math.Vector2(600, 100);
      let p3 = new Phaser.Math.Vector2(700, 500);
      //
      this.curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);
      //
      this.graphics.lineStyle(1, 0xffffff, 1);
      this.curve.draw(this.graphics);
      // Get 32 points from the curve
      let points = this.curve.getPoints(32);
      // Draw the points
      this.graphics.fillStyle(0x00ff00, 1);
      //
      for (let i = 0; i < points.length; i++) {
        this.graphics.fillCircle(points[i].x, points[i].y, 6);
      }
    }

    update () {
    }

    render () {
    }
  }
})();
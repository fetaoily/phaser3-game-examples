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
      this.graphics = null;
    }

    preload() {}
    create() {
      this.graphics = this.add.graphics();
      //
      let curve = new Phaser.Curves.Line(
        new Phaser.Math.Vector2(100, 100),
        new Phaser.Math.Vector2(600, 400)
      );
      //
      this.graphics.lineStyle(1, 0xffffff, 1);
      //
      curve.draw(this.graphics);
      // Get 32 points from the curve
      let points = curve.getSpacedPoints(32);
      // Draw the poiints
      this.graphics.fillStyle(0xff0000, 1);
      //
      for (let i = 0; i < points.length; i++) {
        this.graphics.fillCircle(points[i].x, points[i].y, 4);
      }
    }
    update() {}
    render() {}
  }
})();

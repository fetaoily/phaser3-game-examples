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
      this.curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 200), new Phaser.Math.Vector2(600, 400));
      //
      this.graphics.clear();
      this.graphics.lineStyle(0, 0xffffff, 1);
      //
      this.curve.draw(this.graphics);
      // Get the t value for 200 pixels along the curve
      let t = this.curve.getTFromDistance(200);
      // Get the point at t
      let p = this.curve.getPoint(t);
      //
      this.graphics.fillStyle(0xffffff, 1);
      this.graphics.fillCircle(p.x, p.y, 8);
    }

    update () {
    }

    render () {
    }
  }
})();
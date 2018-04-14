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
      this.load.image('lemming', 'assets/sprites/lemming.png');
    }
    create() {
      let points = [];
      points.push(new Phaser.Math.Vector2(50, 400));
      points.push(new Phaser.Math.Vector2(200, 200));
      points.push(new Phaser.Math.Vector2(350, 300));
      points.push(new Phaser.Math.Vector2(500, 500));
      points.push(new Phaser.Math.Vector2(700, 400));
      //
      let curve = new Phaser.Curves.Spline(points);
      //
      let graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);
      //
      curve.draw(graphics);
      //
      graphics.fillStyle(0x00ff00, 1);
      //
      for (let i = 0; i < points.length; i++) {
        graphics.fillCircle(points[i].x, points[i].y, 4);
      }
      //
      let lemming = this.add.follower(curve, 50, 400, 'lemming');
      lemming.startFollow({
        duration: 6000,
        yoyo: true,
        repeat: -1,
        rotateToPath: true
      });
      //
      this.input.on('pointerdown', () => {
        console.info(lemming);
        if (lemming.isFollowing()) {
          lemming.pause();
        } else {
          lemming.resume();
        }
      });
    }
    update() {}
    render() {}
  }
})();

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
      let startPoint = new Phaser.Math.Vector2(50, 260);
      let controlPoint1 = new Phaser.Math.Vector2(610, 25);
      let controlPoint2 = new Phaser.Math.Vector2(320, 370);
      let endPoint = new Phaser.Math.Vector2(735, 550);
      //
      let curve = new Phaser.Curves.CubicBezier(
        startPoint,
        controlPoint1,
        controlPoint2,
        endPoint
      );
      //
      let graphics = this.add.graphics();
      //
      graphics.lineStyle(0, 0xffffff, 1);
      //
      curve.draw(graphics, 64);
      //
      let ball = this.add.follower(curve, 50, 260, 'ball');
      ball.startFollow({
        duration: 3000,
        yoyo: true,
        ease: 'Sine.easeInOut'
      });
    }
    update() {}
    render() {}
  }
})();

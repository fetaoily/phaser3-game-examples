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
      let points = [
        50,
        300,
        179,
        449,
        394,
        498,
        593,
        455,
        701,
        338,
        692,
        190,
        603,
        76,
        423,
        41,
        272,
        78,
        181,
        186,
        230,
        328,
        416,
        395,
        565,
        327,
        550,
        202,
        467,
        149,
        355,
        164,
        343,
        254,
        428,
        303
      ];
      //
      let curve = new Phaser.Curves.Spline(points);
      let graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);
      //
      curve.draw(graphics, 128);
      //
      graphics.fillStyle(0x00ff00, 0.5);
      //
      for (let i = 0; i < curve.points.length; i++) {
        graphics.fillCircle(curve.points[i].x, curve.points[i].y, 4);
      }
      //
      let lemming = this.add.follower(curve, 50, 300, 'lemming');
      lemming.startFollow({
        duration: 10000,
        yoyo: true,
        repeat: -1,
        rotateToPath: true,
        verticalAdjust: true
      });
    }
    update() {}
    render() {}
  }
})();

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
      this.load.image('sparkle', 'assets/particles/sparkle1.png');
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
      //
      let graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);
      //
      curve.draw(graphics);
      //
      for (let i = 0; i < 20; i++) {
        let follower = this.add.follower(curve, 100, 100 + 30 * i, 'sparkle');
        follower.setBlendMode(Phaser.BlendModes.ADD);
        follower.startFollow({
          duration: 4500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
          delay: i * 100
        });
      }
    }
    update() {}
    render() {}
  }
})();

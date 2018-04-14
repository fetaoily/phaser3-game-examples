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
      let path = new Phaser.Curves.Path(50, 500);
      //
      path.splineTo([164, 446, 274, 542, 412, 457, 522, 541, 664, 464]);
      path.lineTo(700, 300);
      path.lineTo(600, 350);
      path.ellipseTo(200, 100, 100, 250, false, 0);
      path.cubicBezierTo(222, 119, 308, 107, 208, 368);
      path.ellipseTo(60, 60, 0, 360, true);
      //
      let graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);
      //
      path.draw(graphics);
      //
      let lemming = this.add.follower(path, 500, 500, 'lemming');
      //
      lemming.startFollow({
        positionOnPath: true,
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

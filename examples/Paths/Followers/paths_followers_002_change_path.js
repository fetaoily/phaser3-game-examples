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
      let path1 = new Phaser.Curves.Path(50, 100).splineTo([
        164,
        46,
        274,
        142,
        412,
        57,
        522,
        141,
        664,
        64
      ]);
      let path2 = new Phaser.Curves.Path(100, 200).lineTo(500, 300);
      let path3 = new Phaser.Curves.Path(400, 400).circleTo(100);
      //
      let graphics = this.add.graphics();
      //
      graphics.lineStyle(1, 0xffffff, 1);
      //
      path1.draw(graphics);
      path2.draw(graphics);
      path3.draw(graphics);
      //
      let current = 0;
      let lemming = this.add.follower(path1, 0, 0, 'lemming');
      lemming.startFollow({
        positionOnPath: true,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        rotateToPath: true,
        verticalAdjust: true
      });
      //
      this.input.on('pointerdown', () => {
        current++;
        if (current === 3) {
          current = 0;
        }
        if (current === 0) {
          lemming.setPath(path1);
        } else if (current === 1) {
          lemming.setPath(path2);
        } else {
          lemming.setPath(path3);
        }
      });
    }
    update() {}
    render() {}
  }
})();

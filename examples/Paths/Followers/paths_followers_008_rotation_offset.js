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
      let curve = new Phaser.Curves.Line(
        new Phaser.Math.Vector2(100, 100),
        new Phaser.Math.Vector2(600, 400)
      );
      let graphics = this.add.graphics();
      //
      graphics.lineStyle(1, 0xffffff, 0.5);
      //
      curve.draw(graphics);
      //
      let lemming = this.add.follower(curve, 100, 100, 'lemming');
      //
      lemming.startFollow({
        duration: 5000,
        yoyo: true,
        repeat: -1,
        rotateToPath: true,
        rotateOffset: 90
      });
    }
    update() {}
    render() {}
  }
})();

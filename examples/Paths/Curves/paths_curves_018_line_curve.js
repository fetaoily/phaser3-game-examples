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
      this.path = null;
      this.curve = null;
      this.graphics = null;
    }

    preload() {}

    create() {
      this.graphics = this.add.graphics();
      //
      this.path = { t: 0, vec: new Phaser.Math.Vector2() };
      //
      this.curve = new Phaser.Curves.Line(
        new Phaser.Math.Vector2(100, 100),
        new Phaser.Math.Vector2(600, 400)
      );
      //
      this.tweens.add({
        targets: this.path,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 2000,
        yoyo: true,
        repeat: -1
      });
    }

    update() {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffffff, 1);
      //
      this.curve.draw(this.graphics);
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 16);
    }

    render() {}
  }
})();

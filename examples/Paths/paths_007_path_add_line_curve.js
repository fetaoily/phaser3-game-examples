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
      this.follower = null;
      this.path = null;
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
      //
      // Path starts at 100x100
      this.path = new Phaser.Curves.Path(100, 100);
      //
      this.path.lineTo(500, 200);
      this.path.lineTo(200, 300);
      this.path.lineTo(400, 500);
      //
      for (let i = 0; i < 10; i++) {
        this.path.lineTo(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600));
      }
      //
      this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 4000,
        yoyo: true,
        repeat: -1
      })
    }

    update () {
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.path.draw(this.graphics);
      this.path.getPoint(this.follower.t, this.follower.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);
    }

    render () {
    }
  }
})();
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
      this.follower = null;
      this.path = null;
      this.bounds = null;
      this.graphics = null;
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      this.bounds = new Phaser.Geom.Rectangle();
      //
      this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
      //
      // The curves do not have to be joined
      let line1 = new Phaser.Curves.Line([100, 100, 500, 200]);
      let line2 = new Phaser.Curves.Line([200, 300, 600, 500]);
      //
      this.path = this.add.path();
      this.path.add(line1);
      this.path.add(line2);
      //
      this.path.getBounds(this.bounds);
      //
      this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1
      });
    }

    update () {
      this.graphics.clear();
      // Draw the bounds
      this.graphics.lineStyle(1, 0x00ff00, 1).strokeRectShape(this.bounds);
      //
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.path.draw(this.graphics);
      //
      this.path.getPoint(this.follower.t, this.follower.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillRect(this.follower.vec.x - 16 / 2, this.follower.vec.y - 16 / 2, 16, 16);
    }

    render () {
    }
  }
})();
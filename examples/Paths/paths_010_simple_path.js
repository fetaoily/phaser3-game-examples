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
      this.graphics = null;
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
      // The curves do not have to be joined
      let line1 = new Phaser.Curves.Line([100, 100, 500, 200]);
      let line2 = new Phaser.Curves.Line([200, 300, 600, 500]);
      //
      this.path = this.add.path();
      //
      // this.path = new Phaser.Curves.Path();
      this.path.add(line1);
      this.path.add(line2);
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
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.path.draw(this.graphics);
      this.path.getPoint(this.follower.t, this.follower.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillRect(this.follower.vec.x - 8, this.follower.vec.y - 8, 16, 16);
    }

    render () {
    }
  }
})();
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
      this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
      //
      this.path = new Phaser.Curves.Path(400, 300);
      //
      this.path.circleTo(100);
      //
      this.path.moveTo(400, 300);
      // Rotate this circle so it completes the loop
      this.path.circleTo(100, true, 180);
      //
      this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Linear',
        duration: 2000,
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
      this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);
    }

    render () {
    }
  }
})();
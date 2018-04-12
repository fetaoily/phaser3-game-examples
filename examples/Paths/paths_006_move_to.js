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
      //
      this.path = new Phaser.Curves.Path(300, 300);
      // Rotate this circle so it completes the loop
      this.path.circleTo(100);
      // We can move the path to 500x300 without creating any extra duration
      this.path.moveTo(500, 300);
      // Rotate this circle so it completes the loop
      // this.path.circleTo(100, true, 0);
      // this.path.circleTo(100, true, 15);
      // this.path.circleTo(100, true, 30);
      // this.path.circleTo(100, true, 45);
      // this.path.circleTo(100, true, 60);
      // this.path.circleTo(100, true, 75);
      // this.path.circleTo(100, true, 90);
      // this.path.circleTo(100, true, 105);
      // this.path.circleTo(100, true, 120);
      // this.path.circleTo(100, true, 135);
      // this.path.circleTo(100, true, 150);
      // this.path.circleTo(100, true, 165);
      // this.path.circleTo(100, true, 180);
      for (let i = 0; i < 360 / 15; i++) {
        this.path.circleTo(100, true, i * 15);
      }
      //
      this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Linear',
        duration: 1000 * 5,
        repeat: -1
      });

    }

    update () {
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.path.draw(this.graphics);
      //
      this.path.getPoint(this.follower.t, this.follower.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);
    }

    render () {
    }
  }
})();
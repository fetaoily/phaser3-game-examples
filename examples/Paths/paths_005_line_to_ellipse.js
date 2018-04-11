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
      // Path start at 100x100
      this.path = new Phaser.Curves.Path(50, 500);
      //
      this.path.lineTo(150, 300);
      // xRadius,yRadius,startAngle,endAngle,clockwise,rotation
      this.path.ellipseTo(200, 100, 100, 300, false, 45);
      this.path.ellipseTo(200, 100, 100, 300, true);
      this.path.ellipseTo(60);
      //
      this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Sine.easeInOut',
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
      //
      this.path.getPoint(this.follower.t, this.follower.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);
      //
      this.graphics.fillStyle(0xffff00, 1);
      this.graphics.fillRect(this.follower.vec.x - 50, this.follower.vec.y - 50, 24, 24);
      //
      this.graphics.fillStyle(0xffff00, 1);
      this.graphics.fillRect(this.follower.vec.x + 50, this.follower.vec.y + 50, 24, 24);
      //
    }

    render () {
    }
  }
})();
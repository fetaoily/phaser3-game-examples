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
      this.points = null;
      this.graphics = null;
    }

    preload() {}

    create() {
      this.graphics = this.add.graphics();
      //
      this.path = { t: 0, vec: new Phaser.Math.Vector2() };
      //
      this.points = [];
      //
      this.points.push(new Phaser.Math.Vector2(50, 400));
      this.points.push(new Phaser.Math.Vector2(200, 200));
      this.points.push(new Phaser.Math.Vector2(350, 300));
      this.points.push(new Phaser.Math.Vector2(500, 500));
      this.points.push(new Phaser.Math.Vector2(700, 400));
      //
      this.curve = new Phaser.Curves.Spline(this.points);
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
      this.curve.draw(this.graphics, 64);
      //
      this.graphics.fillStyle(0x00ff00, 1);
      //
      for (let i = 0; i < this.points.length; i++) {
        this.graphics.fillCircle(this.points[i].x, this.points[i].y, 4);
      }
      //
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);
    }

    render() {}
  }
})();

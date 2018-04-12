(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        // default: 'impact'
        default: 'arcade'
      },
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
      this.t = 0;
      this.curve = null;
      this.points = null;
      this.ship = null;
      this.tempVec = null;
      this.tempVecP = null;
    }

    preload () {
      this.load.image('ship', 'assets/sprites/lemming.png');
    }

    create () {
      // let p0 = new Phaser.Math.Vector2(100, 500);
      // let p1 = new Phaser.Math.Vector2(50, 100);
      // let p2 = new Phaser.Math.Vector2(600, 100);
      // let p3 = new Phaser.Math.Vector2(750, 300);
      // this.curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);
      //
      this.graphics = this.add.graphics();
      this.curve = new Phaser.Curves.Ellipse(400, 300, 200);
      //
      this.points = this.curve.getSpacedPoints(32);
      //
      this.tempVec = new Phaser.Math.Vector2();
      this.tempVecP = new Phaser.Math.Vector2();
      window.aa = this;
      //
      this.ship = this.physics.add.image(this.points[0].x, this.points[0].y, 'ship');
      //
      this.nextPoint(this);
    }

    update () {
      this.graphics.clear();
      this.curve.draw(this.graphics);
      //
      this.tempVec.scale(180);
      //
      // this.ship.setVelocity(this.tempVec.x, this.tempVec.y);
      //
      this.ship.rotation = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, this.tempVecP.x, this.tempVecP.y);
    }

    render () {
    }

    nextPoint (scene) {
      let next;
      if (this.t === this.points.length) {
        next = this.points[0];
      } else {
        next = this.points[this.t + 1];
      }
      this.moveToXY(this.ship, next.x, next.y, 0, 500);
      this.t++;
      scene.time.addEvent({
        delay: 500,
        callback: this.nextPoint,
        callbackScope: scene,
        args: [scene]
      });
    }

    moveToXY (gameObject, x, y, speed, maxTime) {
      if (speed === undefined) {
        speed = 60;
      }
      if (maxTime === undefined) {
        maxTime = 0;
      }
      //
      let angle = Math.atan2(y, -gameObject.y, x - gameObject.x);
      //
      if (maxTime > 0) {
        // We know how many pixels we need to move, but how fast?
        let dx = gameObject.x - x;
        let dy = gameObject.y - y;
        //
        speed = Math.sqrt(dx * dx + dy * dy) / (maxTime / 1000);
      }
      //
      gameObject.setVelocityX(Math.cos(angle) * speed);
      gameObject.setVelocityY(Math.sin(angle) * speed);
      //
      gameObject.rotation = angle;
    }
  }
})();
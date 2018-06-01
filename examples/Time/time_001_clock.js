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
      this.timeEvent = null;
      this.clockSize = 240;
    }

    preload () {
    }

    create () {
      this.timeEvent = this.time.addEvent({ delay: 4000, repeat: 9 });
      this.graphics = this.add.graphics({ x: 0, y: 0 });
    }


    update () {
      this.graphics.clear();
      this.drawClock(400, 300, this.timeEvent);
    }

    drawClock (x, y, timer) {
      let graphics = this.graphics;
      // Progress is between 0 and 1, where 0 = the hand pointing up and then rotating clockwise a full 360
      // The frame
      graphics.lineStyle(6, 0xffffff, 1);
      graphics.strokeCircle(x, y, this.clockSize);
      //
      let angle;
      let dest;
      let p1;
      let p2;
      let size;
      // The overall progress hand (only if repeat > 0)
      if (timer.repeat > 0) {
        size = this.clockSize * 0.9;
        //
        angle = (360 * timer.getOverallProgress()) - 90;
        dest = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle), size);
        //
        graphics.lineStyle(2, 0xff0000, 1);
        graphics.beginPath();
        graphics.moveTo(x, y);
        //
        p1 = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);
        //
        graphics.lineTo(p1.x, p1.y);
        graphics.lineTo(dest.x, dest.y);
        //
        graphics.moveTo(x, y);
        //
        p2 = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);
        //
        graphics.lineTo(p2.x, p2.y);
        graphics.lineTo(dest.x, dest.y);
        //
        graphics.strokePath();
        graphics.closePath();
      }
      //
      // The current iteration hand
      size = this.clockSize * 0.95;
      //
      angle = (360 * timer.getProgress()) - 90;
      dest = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle), size);
      //
      graphics.lineStyle(2, 0xffff00, 1);
      graphics.beginPath();
      graphics.moveTo(x, y);
      //
      p1 = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);
      //
      graphics.lineTo(p1.x, p1.y);
      graphics.lineTo(dest.x, dest.y);
      //
      graphics.moveTo(x, y);
      //
      p2 = Phaser.Math.RotateAroundDistance({ x, y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);
      //
      graphics.lineTo(p2.x, p2.y);
      graphics.lineTo(dest.x, dest.y);
      //
      graphics.strokePath();
      graphics.closePath();
    }
  }
})();
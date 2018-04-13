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
      this.counter = 0;
      this.counterTimer = 0;
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      let p0 = (this.p0 = new Phaser.Math.Vector2(100, 500));
      let p1 = (this.p1 = new Phaser.Math.Vector2(50, 100));
      let p2 = (this.p2 = new Phaser.Math.Vector2(600, 100));
      let p3 = (this.p3 = new Phaser.Math.Vector2(700, 500));
      //
      let curve = (this.curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3));
      //
      this.drawCurve();
    }

    update (time, delta) {
      if (time > this.counterTimer) {
        this.counter++;
        //
        let x = Phaser.Math.Between(0, 800) * Math.sin(this.counter);
        this.p3.x = x;
        this.drawCurve();
        //
        this.counterTimer = time + 100;
      }
    }

    render () {
    }

    drawText (point, label) {
      label = label || `point:${JSON.stringify(point)}`;
      this.add.text(point.x, point.y, label, {font: '16px', fill: '#ff00ff'});
    }

    drawCurve () {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffffff, 1);
      this.curve.draw(this.graphics, 64);
      // Get 20 points equally spaced out along the curve
      let points = this.curve.getSpacedPoints(20);
      // Draw the points
      this.graphics.fillStyle(0xff0000, 1);
      //
      for (let i = 0; i < points.length; i++) {
        this.graphics.fillCircle(points[i].x, points[i].y, 4);
      }
      //
      this.drawText(this.p0);
      this.drawText(this.p1);
      this.drawText(this.p2);
      this.drawText(this.p3);
    }
  }
})();

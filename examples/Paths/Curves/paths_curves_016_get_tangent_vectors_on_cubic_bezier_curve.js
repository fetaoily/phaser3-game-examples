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
    }

    preload () {
    }

    create () {
      this.graphics = this.add.graphics();
      //
      let p0 = new Phaser.Math.Vector2(100, 500);
      let p1 = new Phaser.Math.Vector2(50, 100);
      let p2 = new Phaser.Math.Vector2(600, 100);
      let p3 = new Phaser.Math.Vector2(700, 500);
      //
      let curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);
      let max = 16;
      let points = [];
      let tangents = [];
      //
      for (let c = 0; c <= max; c++) {
        let t = curve.getUtoTmapping(c / max);
        points.push(curve.getPoint(t));
        tangents.push(curve.getTangent(t));
      }
      //
      let tempVec = new Phaser.Math.Vector2();
      // Draw the points
      this.graphics.fillStyle(0xff0000, 1);
      //
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        this.graphics.fillCircle(p.x, p.y, 6);
        // Draw the tangent vector
        tempVec
            .copy(tangents[i])
            .scale(32)
            .add(p);
        //
        this.graphics.lineStyle(1, 0x00ff00, 1);
        this.graphics.lineBetween(p.x, p.y, tempVec.x, tempVec.y);
        // Draw the right-hand tangent vector
        tempVec
            .copy(tangents[i])
            .normalizeRightHand()
            .scale(-32)
            .add(p);
        //
        this.graphics.lineStyle(1, 0xff00ff, 1);
        this.graphics.lineBetween(p.x, p.y, tempVec.x, tempVec.y);
      }
    }

    update () {
    }

    render () {
    }
  }
})();

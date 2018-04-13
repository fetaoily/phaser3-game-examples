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
      this.curve = null;
      this.points = null;
      this.size = 32;
      this.graphics = null;
    }

    preload() {}
    create() {
      this.graphics = this.add.graphics();
      this.curve = new Phaser.Curves.Spline([
        50,
        300,
        164,
        246,
        274,
        342,
        412,
        257,
        522,
        341,
        664,
        264
      ]);
      //
      this.points = this.curve.getDistancePoints(this.size);
    }
    update() {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffffff, 1);
      //
      this.curve.draw(this.graphics, 64);
      //
      this.graphics.fillStyle(0x00ff00, 1);
      this.graphics.lineStyle(1, 0x00ff00, 1);
      //
      for (let i = 0; i < this.points.length; i++) {
        let p = this.points[i];
        //
        this.graphics.fillCircle(p.x, p.y, 2);
        //
        let x = p.x - this.size / 2;
        let y = p.y - this.size / 2;
        this.graphics.strokeRect(x, y, this.size, this.size);
      }
    }
    render() {}
  }
})();

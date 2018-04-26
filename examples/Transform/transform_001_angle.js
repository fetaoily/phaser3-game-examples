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
    }

    preload () {
      this.load.image('grid', 'assets/pics/debug-grid-1920x1920.png');
      this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create () {
      // Angle use degrees instead of radians
      let arrowArr = this.arrowArr = [];
      for (let a = 0; a <= 360; a += 45) {
        let frame = this.add.image(40 + a * 2, 300, 'arrow').setAngle(a);
        // You can also do: frame.angle = degrees
        arrowArr.push(frame);
      }
      //
    }

    update () {
      let arrow = this.arrowArr[Phaser.Math.Between(0, 8)];
      arrow.angle += 10;
    }
  }
})();
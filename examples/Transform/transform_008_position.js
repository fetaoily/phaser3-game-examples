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
      this.load.image('atari', 'assets/sprites/atari130xe.png');
    }

    create () {
      this.add.image(0, 0, 'grid').setOrigin(0);
      // Images are positioned at x, y based on the center of the image
      let x = 320;
      let y = 100;
      //
      this.add.image(x, y, 'atari');
      // You can also use the x and y properties
      let image2 = this.add.image(0, 0, 'atari');
      //
      image2.x = 600;
      image2.y = 200;
      // Or the setPosition method, which allows for chaining:
      this.add.image(0, 0, 'atari').setPosition(320, 320);
    }

    update () {
    }
  }
})();
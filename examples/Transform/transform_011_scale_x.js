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
      this.load.image('atari', 'assets/sprites/atari130xe.png');
    }

    create () {
      // setScale sets the x and y scale values (1 = no scale)
      this.add.image(400, 100, 'atari').setScale(0.5, 1);
      //
      this.add.image(400, 300, 'atari').setScale(2, 1);
      //
      let image2 = this.add.image(400, 500, 'atari');
      // You can also set the scale via the scaleX property:
      image2.scaleX = 2.5;
    }

    update () {
    }
  }
})();
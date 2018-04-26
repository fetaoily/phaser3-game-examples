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
      this.load.image('frame', 'assets/pics/scrollframe.png');
      this.load.image('pic', 'assets/pics/cougar-face-of-nature.png');
    }

    create () {
      this.add.image(0, 0, 'frame').setOrigin(0);
      // setDisplaySize will adjust the scale of an image to make it fit the given pixel dimensions:
      this.add.image(32, 32, 'pic').setOrigin(0).setDisplaySize(352, 240);
    }
  }
})();
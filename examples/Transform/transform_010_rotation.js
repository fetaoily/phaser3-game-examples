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
      this.atlasFrame = null;
      this.singleImage = null;
    }

    preload () {
      this.load.image('atari', 'assets/sprites/atari130xe.png');
      this.load.atlas('atlas', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');
    }

    create () {
      this.atlasFrame = this.add.image(300, 100, 'atlas', 'dragonwiz');
      this.singleImage = this.add.image(300, 300, 'atari');
    }

    update () {
      this.atlasFrame.rotation += 0.01;
      this.singleImage.rotation += 0.01;
    }

  }
})();
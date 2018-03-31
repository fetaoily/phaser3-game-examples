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
      this.counter = 0;
      this.alphaTimer = 0;
    }

    preload () {
      this.load.image('face', 'assets/pics/bw-face.png');
    }

    create () {
      let image = this.image = this.add.image(400, 300, 'face');
      image.setAlpha(0.1);
    }

    update () {
      this.counter++;
      if (this.time.now > this.alphaTimer) {
        this.image.alpha = Math.abs(Math.sin(this.counter));
        this.alphaTimer = this.time.now + 200;
      }

    }

    render () {
    }
  }
})();
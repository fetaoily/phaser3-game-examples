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
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let marker = this.add.image(100, 300, 'block').setAlpha(0.3);
      let image = this.add.image(100, 300, 'block');
      // The 'Stepped' ease takes one argument : steps
      // The default value is 1
      // But you can set whatever you like in the ease Params array
      this.tweens.add({
        targets: image,
        x: 600,
        duration: 2000,
        ease: 'Stepped',
        easeParams: [10],
        delay: 1000
      });
    }

    update () {
    }
  }
})();
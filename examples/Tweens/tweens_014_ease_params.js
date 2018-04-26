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
      // The 'Back' ease takes on argument: overshoot.
      // The default value is 1.70158
      // But you can set whatever you like in the easeParams array
      this.tweens.add({
        targets: image,
        x: 600,
        duration: 3000,
        ease: 'Back',
        easeParams: [3.5],
        delay: 1000
      });
    }

    update () {
    }
  }
})();
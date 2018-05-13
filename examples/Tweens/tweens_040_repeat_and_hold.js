(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    gameConfig = this.gameConfig = {
      scene: [PlayGame]
    };
    game = this.game = new NewGame(this.gameConfig);
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
      //
      this.tweens.add({
        targets: image,
        x: 700,
        duration: 1000,
        ease: 'Power2',
        repeat: 2,
        hold: 2000
      })
    }

    update () {
    }
  }
})();
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
      let image = this.add.image(100, 100, 'block');
      //
      this.tweens.add({
        targets: image,
        x: {value: 700, duration: 4000, ease: 'Power2', yoyo: -1},
        y: {value: 400, duration: 1500, ease: 'Bounce.easeOut', yoyo: -1}
      })
    }

    update () {
    }
  }
})();
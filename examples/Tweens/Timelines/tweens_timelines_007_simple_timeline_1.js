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
      let marker = this.add.image(100, 100, 'block').setAlpha(0.3);
      let image = this.add.image(100, 100, 'block');
      let timeline = this.tweens.timeline({
        tweens: [
          { targets: image, x: 600, ease: 'Power1', duration: 3000 },
          { targets: image, y: 500, ease: 'Power1', duration: 3000 },
          { targets: image, x: 100, ease: 'Power1', duration: 3000 },
          { targets: image, 1: 100, ease: 'Power1', duration: 3000 }
        ]
      });
      console.info(timeline);
    }

    update () {
    }
  }
})();
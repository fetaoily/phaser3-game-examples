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
      let image = this.add.image(100, 300, 'block');
      this.timeline = this.tweens.timeline({
        targets: image,
        loop: 4,
        tweens: [
          { x: 700, ease: 'Sine.easeInOut', duration: 2000, yoyo: true },
          { y: 100, ease: 'Sine.easeOut', duration: 1000, offset: 0 },
          { y: 300, ease: 'Sine.easeIn', duration: 1000 },
          { y: 500, ease: 'Sine.easeOut', duration: 1000 },
          { y: 300, ease: 'Sine.easeIn', duration: 1000 }
        ]
      });
      console.info(this.timeline);
    }

    update () {
    }
  }
})();
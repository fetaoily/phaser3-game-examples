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
        x: {value: 700, duration: 4000, ease: 'Power2', delay: 500},
        y: {value: 400, duration: 1500, ease: 'Bounce.easeOut'},
        scaleX: {value: 1.5, duration: 2000, delay: 2000, yoyo: true},
        scaleY: {
          value: 4, duration: 2000,
          delay (i, total, target) {
            return 1000 + Math.random() * 2000
          },
          yoyo: true
        },
        delay: 1000
      });
    }

    update () {
    }
  }
})();
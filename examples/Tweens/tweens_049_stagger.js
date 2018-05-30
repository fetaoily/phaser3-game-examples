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
      let image1 = this.add.image(100, 100, 'block');
      let image2 = this.add.image(100, 200, 'block');
      let image3 = this.add.image(100, 300, 'block');
      let image4 = this.add.image(100, 400, 'block');
      let image5 = this.add.image(100, 500, 'block');
      //
      this.tweens.add({
        targets: [image1, image2, image3, image4, image5],
        x: 700,
        yoyo: true,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        delay (i, total, target) {
          return i * 100;
        }
      });

    }

    update () {
    }
  }
})();
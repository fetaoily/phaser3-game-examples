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
      let image2 = this.add.image(100, 300, 'block');
      let image3 = this.add.image(100, 500, 'block');
      // Absolute offsets start at Xms into the Timeline
      let timeline = this.tweens.timeline({
        ease: 'Power2',
        duration: 2000,
        tweens: [
          { targets: image1, x: 600, offset: 3000 },
          { targets: image2, x: 600, offset: 2000 },
          { targets: image3, x: 600, offset: 1000 }
        ]
      });
      console.info(timeline);
    }

    update () {
    }
  }
})();
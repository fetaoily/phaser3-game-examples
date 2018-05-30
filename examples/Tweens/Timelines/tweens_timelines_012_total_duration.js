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
      // If you specify a totalDuration property the amount given will be divided
      // equally between all of the Tweens. Tweens call still override it by specifying a duration locally.
      let timeline = this.tweens.timeline({
        targets: image,
        ease: 'Power1',
        totalDuration: 2000,
        tweens: [
          { x: 600 },
          { y: 500 },
          { x: 100 },
          { y: 100 }
        ]
      });
      console.info(timeline);
    }

    update () {
    }
  }
})();
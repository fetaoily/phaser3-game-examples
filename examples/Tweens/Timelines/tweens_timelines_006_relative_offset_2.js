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
        targets: image,
        tweens: [{
          x: 600,
          ease: 'Linear',
          duration: 3000
        }, {
          y: 500,
          ease: 'Linear',
          duration: 1000,
          offset: '-=500'// starts 500ms before previous tween ends
        }, {
          x: 100,
          ease: 'Linear',
          duration: 3000,
          offset: '-=500'// starts 500ms before previous tween ends
        }, {
          y: 100,
          ease: 'Linear',
          duration: 1000,
          offset: '-=500'// starts 500ms before previous tween ends
        }]
      });
      console.log(timeline);
    }

    update () {
    }
  }
})();
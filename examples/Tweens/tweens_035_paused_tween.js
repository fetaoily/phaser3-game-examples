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
      // Create a chained tween
      let tween = this.tweens.add({
        targets: image,
        x: '+=600',
        ease: 'Power2',
        paused: true
      });
      //
      // this.input.once('POINTER_DOWN_EVENT', () => {
      //   tween.play();
      // });
      this.input.once('pointerdown', () => {
        tween.play();
      });
    }

    update () {
    }
  }
})();
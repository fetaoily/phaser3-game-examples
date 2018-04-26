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
      let marker = this.add.image(100, 300, 'block').setAlpha(0.3);
      let image = this.add.image(100, 300, 'block');

      let tween = this.tweens.add({
        targets: image,
        x: 700,
        delay: 1000,
        duration: 6000,
        ease: 'Power2'
      });
      //
      this.input.on('pointerdown', () => {
        tween.stop();
      });
    }

    update () {
    }

    render () {
    }
  }
})();
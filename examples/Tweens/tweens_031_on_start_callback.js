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
      let image = this.add.image(100, 100, 'block').setAlpha(0);
      //
      let tween = this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        paused: true,
        onStart: this.onStartHandler,
        onStartParams: [image]
      });
      //
      this.input.once('pointerdown', () => {
        tween.play();
      });
    }

    update () {
    }

    // The callback is always sent a reference to the Tween as the first argument and the targets as the second,
    // The whatever you provided in the onStartParams array follows
    onStartHandler (tween, targets, gameObject) {
      console.info(arguments);
      gameObject.setAlpha(1);
    }
  }
})();
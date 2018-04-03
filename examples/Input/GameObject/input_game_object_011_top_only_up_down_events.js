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
      this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
    }

    create () {
      for (let i = 0; i < 64; i++) {
        this.add.sprite(100 + i * 30, 100 + i * 30, 'eye').setInteractive();
      }
      // If you disable topOnly it will fire events for all objects the pointer is over
      // regardless of their place on the display list
      this.input.setTopOnly(false);
      // Events
      this.input.on('gameobjectdown', (pointer, gameObject) => {
        gameObject.setTint(0x00ff00);
        gameObject.setScale(2);
      });
      this.input.on('gameobjectout', (pointer, gameObject) => {
        gameObject.clearTint();
        gameObject.setScale(1);
      });
      this.input.on('gameobjectup', (pointer, gameObject) => {
        gameObject.clearTint();
        gameObject.setScale(1);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
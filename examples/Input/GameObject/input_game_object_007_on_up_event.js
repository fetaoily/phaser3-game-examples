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
      let sprite = this.add.sprite(400, 300, 'eye').setInteractive();
      sprite.on('pointerup', (pointer) => {
        sprite.setTint(Math.random() * 16000000);
        //
        this.tweens.add({
          targets: sprite,
          alpha: 0,
          scaleX: 2,
          scaleY: 2,
          yoyo: true,
          repeat: -1
        })
      })
    }

    update () {
    }

    render () {
    }
  }
})();
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
      sprite.on('pointerdown', () => {
        sprite.setTint(Math.random() * 0xffffff);
        this.tweens.add({
          targets: sprite,
          alpha: 0,
          scaleX: 3,
          scaleY: 3,
          duration: 200,
          yoyo: true,
          repeat: -1
        })
      });
    }

    update () {
    }

    render () {
    }
  }
})();
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
      sprite.on('pointerover', (pointer) => {
        sprite.setTint(0xff0000);
        this.tweens.add({
          targets: sprite,
          scaleX: 2,
          scaleY: 2
        })
      });
      sprite.on('pointerout', (pointer) => {
        sprite.clearTint();
        this.tweens.add({
          targets: sprite,
          scaleX: 0.5,
          scaleY: 0.5
        })
      });
    }

    update () {
    }

    render () {
    }
  }
})();
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
      sprite.on('pointermove', (pointer, x, y) => {
        sprite.setTint(Math.random() * 16000000);
        let w = sprite.width;
        let h = sprite.height;
        console.info(w, h);
        this.tweens.add({
          targets: sprite,
          scaleX: x / w * 2,
          scaleY: y / h * 2
        })
      });
    }

    update () {
    }

    render () {
    }
  }
})();
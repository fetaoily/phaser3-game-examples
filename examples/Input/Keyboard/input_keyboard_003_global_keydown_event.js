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
    }

    create () {
      // Receives every single key down event, regardless of origin or key
      this.input.keyboard.on('keydown', (event) => {
        console.dir(event);
        let x = Phaser.Math.Between(0, 800);
        let y = Phaser.Math.Between(0, 600);
        this.add.text(x, y, event.keyCode);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
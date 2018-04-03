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
      this.load.spritesheet('aliens', 'assets/sprites/bsquadron-enemies.png', {frameWidth: 192, frameHeight: 160});
    }

    create () {
      let alien = this.add.sprite(400, 300, 'aliens', 0).setInteractive();
      alien.on('pointerover', () => {
        alien.setFrame(3);
      });
      alien.on('pointerout', () => {
        alien.setFrame(0);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
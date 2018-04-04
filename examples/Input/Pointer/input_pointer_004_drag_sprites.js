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
      this.load.spritesheet('balls', '/assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17});
    }

    create () {
      this.input.on('pointermove', (pointer) => {
        if (pointer.isDown) {
          this.add.image(pointer.x, pointer.y, 'balls', Phaser.Math.Between(0, 5));
        }
      }, this);
    }

    update () {
    }

    render () {
    }
  }
})();
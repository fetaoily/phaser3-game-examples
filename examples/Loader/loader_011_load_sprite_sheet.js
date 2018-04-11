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
      // Standard:
      this.load.spritesheet('explosion', 'assets/sprites/explosion.png', {
        frameWidth: 64,
        frameHeight: 64,
        endFrame: 23
      });
      this.load.spritesheet('balls', 'assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17});
    }

    create () {
      let config = {
        key: 'explodeAnimation',
        frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 23, first: 23}),
        frameRate: 20,
        repeat: -1
      };
      //
      this.anims.create(config);
      //
      let boom = this.add.sprite(400, 300, 'explosion');
      boom.anims.play('explodeAnimation');
      //
      this.add.sprite(400, 300, 'balls', 3);
    }

    update () {
    }

    render () {
    }
  }
})();
(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: {y: 200}
        }
      },
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
      let block = this.physics.add.image(400, 100, 'block');
      //
      block.setVelocity(100, 200);
      block.setBounce(1, 1);
      block.setCollideWorldBounds(true);
    }

    update () {
    }

    render () {
    }
  }
})();
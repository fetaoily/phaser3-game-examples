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
          gravity: {x: 0}
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
      this.block = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      this.block = this.physics.add.image(0, 0, 'block');
      //
      this.block.setVelocity(150, 150);
      //
      this.text = this.add.text(32, 32, '', {font: '36px', fill: '#FF00FF'});
    }

    update () {
      this.physics.world.wrap(this.block, 48);
      //
      this.text.setText(`x:${this.block.x.toFixed(2)},y:${this.block.y.toFixed(2)}`);
    }

    render () {
    }
  }
})();
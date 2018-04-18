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
      block.setBounce(0.9);
      block.setCollideWorldBounds(true);
      //
      block.setInteractive();
      //
      let text = this.add.text(10, 10, 'Clicks: 5', {font: '16px Courier', fill: '#00ff00'});
      //
      let i = 5;
      let ClickNuke;
      this.input.on('pointerdown', ClickNuke = () => {
        console.info(this);
        i--;
        text.setText('Clicks: ' + i);
        if (i === 0) {
          block.destroy();
          this.input.off('pointerdown', ClickNuke);
        } else {
          block.setVelocity(Phaser.Math.Between(-300, 300), -600);
        }
      }, this);
    }

    update () {
    }

    render () {
    }
  }
})();
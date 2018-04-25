(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            x: 0, y: 0
          }
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
      this.image = null;
      this.cursors = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      // this.matter.world.setBounds();
      this.image = this.matter.add.image(400, 300, 'block');
      //
      this.matter.add.image(700, 200, 'block').setBounce(0.6);
      this.matter.add.image(100, 500, 'block').setBounce(0.6);
      //
      this.matter.world.setBounds(0, 0, 800, 600);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.image.setVelocityX(-10);
      } else if (this.cursors.right.isDown) {
        this.image.setVelocityX(10);
      } else {
        this.image.setVelocityX(0);
      }
      //
      if (this.cursors.up.isDown) {
        this.image.setVelocityY(-10);
      } else if (this.cursors.down.isDown) {
        this.image.setVelocityY(10);
      } else {
        this.image.setVelocityY(0);
      }
    }

    render () {
    }
  }
})();
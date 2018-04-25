(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true
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
      this.load.image('blue', 'assets/sprites/columns-blue.png');
    }

    create () {
      this.matter.world.setBounds().disableGravity();
      // By default it will create a rectangular body the size of the texture
      let rect = this.matter.add.image(200, 50, 'blue');
      // However, you can tell it to create any size rectangle you like, such as this one:
      rect.setBody({
        type: 'rectangle',
        width: 128,
        height: 128
      });
      // Just make the body move around and bounce
      rect.setVelocity(6, 3);
      rect.setAngularVelocity(0.01);
      rect.setBounce(1);
      rect.setFriction(0, 0, 0);
    }

    update () {
    }
  }
})();
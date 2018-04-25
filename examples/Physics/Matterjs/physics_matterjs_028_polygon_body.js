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
      this.load.image('orange', 'assets/sprites/columns-orange.png');
    }

    create () {
      this.matter.world.setBounds().disableGravity();
      //
      let poly = this.matter.add.image(200, 50, 'orange');
      poly.setBody({
        type: 'polygon',
        sides: 6,
        radius: 64
      });
      // Just make the body move around and bounce
      poly.setVelocity(6, 3);
      poly.setAngularVelocity(0.01);
      poly.setBounce(1);
      poly.setFriction(0, 0, 0);
    }

    update () {
    }
  }
})();
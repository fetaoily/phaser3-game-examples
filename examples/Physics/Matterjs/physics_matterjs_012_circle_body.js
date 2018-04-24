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
      this.load.image('red', 'assets/sprites/columns-red.png');
    }

    create () {
      this.matter.world.setBounds().disableGravity();
      //
      let circ = this.matter.add.image(200, 50, 'red');
      // Change the body to a Circle with a radius of 48px
      circ.setBody({
        type: 'circle',
        radius: 48
      });
      // Just make the body move around and bounce
      circ.setVelocity(6, 3);
      circ.setAngularVelocity(0.01);
      circ.setBounce(1);
      circ.setFriction(0, 0, 0);

    }

    update () {
    }

    render () {
    }
  }
})();
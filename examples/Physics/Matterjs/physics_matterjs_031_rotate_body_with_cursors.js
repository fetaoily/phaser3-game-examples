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
            x: 0,
            y: 0
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
      this.ship = null;
      this.cursors = null;
    }

    preload () {
      this.load.image('ship', 'assets/sprites/x2kship.png');
    }

    create () {
      this.ship = this.matter.add.image(400, 300, 'ship');
      //
      this.ship.setFrictionAir(0.15);
      this.ship.setMass(30);
      this.ship.setFixedRotation();
      //
      this.matter.world.setBounds(0, 0, 800, 600);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-0.1);
      } else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(0.1);
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.thrust(0.08);
      }
    }
  }
})();
(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
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
    }

    preload () {
      this.load.image('ship', 'assets/sprites/x2kship.png');
    }

    create () {
      this.ship = this.matter.add.image(400, 300, 'ship');
      //
      this.ship.setFixedRotation();
      this.ship.setAngle(270);
      this.ship.setFrictionAir(0.05);
      this.ship.setMass(30);
      //
      this.matter.world.setBounds(0, 0, 800, 600);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.ship.thrustLeft(0.1);
      } else if (this.cursors.right.isDown) {
        this.ship.thrustRight(0.1);
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.thrust(0.1);
      } else if (this.cursors.down.isDown) {
        this.ship.thrustBack(0.1);
      }
    }
  }
})();
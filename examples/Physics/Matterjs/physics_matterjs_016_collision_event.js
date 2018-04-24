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
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let blockA = this.matter.add.image(0, 300, 'block').setBounce(1).setFriction(0);
      let blockB = this.matter.add.image(600, 300, 'block').setStatic(true);
      //
      blockA.setVelocityX(10);
      //
      this.matter.world.on('collisionstart', (Event, bodyA, bodyB) => {
        bodyA.gameObject.setTint(0xff0000);
        bodyB.gameObject.setTint(0x00ff00);
        //
        bodyA.gameObject.setScale(1.5);
        bodyB.gameObject.setScale(0.5);
      });
    }

    update () {
    }

    render () {
    }
  }
})();

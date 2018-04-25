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
      let blockA = this.matter.add.image(200, 300, 'block').setBounce(1).setFriction(0);
      let blockB = this.matter.add.image(400, 300, 'block');
      //
      let blockC = this.matter.add.image(750, 300, 'block').setStatic(true);
      let blockD = this.matter.add.image(50, 300, 'block').setStatic(true);
      //
      let cat1 = this.matter.world.nextCategory();
      blockA.setCollisionCategory(cat1);
      blockC.setCollisionCategory(cat1);
      //
      let cat2 = this.matter.world.nextCategory();
      blockD.setCollisionCategory(cat2);
      //
      blockA.setCollidesWith([cat1, cat2]);
      //
      blockA.setVelocityX(25);
      //
      this.matter.world.on('collisionstart', (event) => {
        event.pairs[0].bodyA.gameObject.setTint(0xff0000);
        event.pairs[0].bodyB.gameObject.setTint(0x00ff00);
        //
        event.pairs[0].bodyA.gameObject.setScale(1.5);
        event.pairs[0].bodyB.gameObject.setScale(0.5);

      });
    }

    update () {
    }

    render () {
    }
  }
})();
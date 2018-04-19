(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
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
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let blockA = this.impact.add.image(60, 300, 'block');
      let blockB = this.impact.add.image(730, 300, 'block');
      //
      blockA.setTypeA().setCheckAgainstB().setActive().setMaxVelocity(300);
      blockB.setTypeB().setCheckAgainstA().setFixed();
      //
      blockA.setVelocityX(300).setBounce(0.05);
      // The callback will be sent the arguments: bodyA (which is the body of blockA in this case), the other body it hits and the axis
      blockA.setCollideCallback(this.collide, this);
    }

    collide (bodyA, bodyB, axis) {
      bodyB.gameObject.tint = 0xff0000;
      bodyB.gameObject.setScale(2);
      // bodyA.gameObject.setScale(3);
    }

    update () {
    }

    render () {
    }
  }
})();
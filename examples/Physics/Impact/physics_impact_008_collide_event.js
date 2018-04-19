(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact'
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
      blockA.setVelocityX(300);
      //
      // this.impact.world.on('COLLIDE_EVENT', this.collide1);
      this.impact.world.on('collide', this.collide2);
    }

    update () {
    }

    render () {
    }

    collide1 (event) {
      event.gameObject.tint = 0xff0000;
    }

    collide2 (bodyA, bodyB) {
      console.info(bodyA);
      console.info(bodyB);
      bodyA.gameObject.tint = 0xff0000;
      bodyA.gameObject.setScale(2);
    }
  }
})();
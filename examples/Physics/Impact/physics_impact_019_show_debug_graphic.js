(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          gravity: 200
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
      this.add.image(100, 60, 'block').setTint(0xff0000);
      this.add.image(400, 160, 'block').setTint(0xff0000);
      this.add.image(700, 260, 'block').setTint(0xff0000);
      //
      let bodyA = this.impact.add.image(100, 60, 'block');
      let bodyB = this.impact.add.image(400, 160, 'block');
      let bodyC = this.impact.add.image(700, 260, 'block');
      //
      // Create a floor. We don't need to render it, so just make a Body
      this.impact.add.body(0, 500, 800, 64).setFixed().setGravity(0);
      //
      this.impact.world.setAvsB([bodyA, bodyB, bodyC]);
      this.impact.world.setActive([bodyA, bodyB, bodyC]);
      //
      bodyA.setMaxVelocity(600).setBounce(0.9);
      bodyB.setMaxVelocity(600).setBounce(0.8);
      bodyC.setMaxVelocity(600).setBounce(0.7);
    }

    update () {
    }

    render () {
    }
  }
})();
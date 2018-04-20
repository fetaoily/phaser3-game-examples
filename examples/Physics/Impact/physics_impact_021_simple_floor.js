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
      let bodyA = this.impact.add.image(100, 60, 'block');
      let bodyB = this.impact.add.image(400, 160, 'block');
      let bodyC = this.impact.add.image(700, 260, 'block');
      // Create a floor using setBounds
      // x, y, width, height, left, right, top, bottom (true = our floor)
      this.impact.world.setBounds(100, 100, 800 - 200, 600 - 200, 64, false, false, false, true);
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
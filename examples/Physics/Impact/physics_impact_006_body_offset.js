(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          gravity: 200,
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
      let block = this.impact.add.image(400, 100, 'block');
      //
      block.setActive().setAvsB().setMaxVelocity(600).setBounce(0.8);
      //
      // Change the size and position of the physics body in relation to the Image it is bound to
      block.setOffset(16, 16, 64, 64);
      // Create a floor. We don't need to render it, so just make a Fixed Body
      this.impact.add.body(0, 500, 800, 64).setFixed().setGravity(0);
    }

    update () {
    }

    render () {
    }
  }
})();
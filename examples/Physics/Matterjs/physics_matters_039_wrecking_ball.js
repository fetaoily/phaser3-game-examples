(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          // debug: true
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
      this.load.image('crate', 'assets/sprites/crate.png');
      this.load.image('crate32', 'assets/sprites/crate32.png');
    }

    create () {
      this.matter.world.setBounds();
      // Increase the solver step from the default to aid with the stack
      this.matter.world.engine.positionIterations = 30;
      this.matter.world.engine.velocityIterations = 30;
      //
      let stack = this.matter.add.imageStack('crate32', null, 300, 50, 5, 18, 30, 0, {mass: 0});
      //
      this.matter.add.mouseSpring();
    }

    update () {
    }
  }
})();
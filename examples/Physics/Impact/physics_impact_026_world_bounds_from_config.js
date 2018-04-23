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
          gravity: 100,
          setBounds: true,
          maxVelocity: 500
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
      this.load.image('gem', 'assets/sprites/gem.png');
    }

    create () {
      // Thew world bounds have been set in the config
      // setBounds: true is the sane as colling physics.world.setBounds() with no arguments
      // If you don't set the body as active it won't collide with the world bounds
      this.impact.add.image(300, 300, 'gem').setActive().setVelocity(300, 200).setBounce(1);
    }

    update () {
    }

    render () {
    }
  }
})();
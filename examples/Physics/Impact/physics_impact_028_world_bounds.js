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
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // If you don't set the body as active it won't collide with the world bounds
      this.impact.add.image(300, 300, 'gem').setActive().setVelocity(300, 200).setBounce(1);
    }

    update () {
    }

    render () {
    }
  }
})();
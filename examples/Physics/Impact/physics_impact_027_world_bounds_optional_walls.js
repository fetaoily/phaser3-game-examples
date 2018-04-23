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
          maxVelocity: 500,
          setBounds: {
            x: 100,
            y: 100,
            width: 600,
            height: 300,
            thickness: 32,
            left: true,
            right: true,
            bottom: true,
            top: false
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
      this.load.image('gem', 'assets/sprites/gem.png');
    }

    create () {
      // The world bounds have been set in the config.
      // The config has set the top wall to be missing.
      // If you don't set the body as active it won't collide with the world bounds
      this.impact.add.image(300, 300, 'gem').setActive().setVelocity(300, 200).setBounce(0.95);

      // It is your responsibility to ensure that new bodies are spawned within the world bounds.
    }

    update () {
    }

    render () {
    }
  }
})();
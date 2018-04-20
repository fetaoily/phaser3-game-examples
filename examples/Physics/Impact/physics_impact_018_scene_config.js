// Here we'll define the physics settings in the Scene Config
// Note that settings defined in the Game Config are also used, but the Scene Config takes priority.
// For example: the setting gravity has a value of 500 in the game config and 100 in the scene config.
// The final gravity value will be 100, because the Scene value overrides the Game one.
// Properties defined in the Game config that are missing in the Scene config are used.

// A Scene can only ever have 1 active physics system, but the 'system' key must match the game config
// in order for the two configs to merge properly
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
          gravity: 500,
          maxVelocity: 500,
          debugBodyColor: 0xff00ff
        }
      },
      scene: [PlayGame, SceneA, SceneB]
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
  }

  class SceneA extends ErtaoGameScene {
    constructor () {
      super({
        key: 'sceneA',
        active: true,
        physics: {
          arcade: {
            gravity: 500
          },
          impact: {
            gravity: 100,
            debugBodyColor: 0xffff00,
            setBounds: {
              x: 100,
              y: 100,
              width: 600,
              height: 150,
              thickness: 32
            }
          }
        }
      });
    }

    preload () {
      console.info('preload-SceneA');
    }

    create () {
      this.impact.add.image(100, 100, 'gem').setActive().setVelocity(300, 200).setBounce(1);
    }
  }

  class SceneB extends ErtaoGameScene {
    constructor () {
      super({
        key: 'sceneB',
        active: true,
        physics: {
          debug: true,
          system: 'impact',
          gravity: 100,
          debugBodyColor: 0xffff00,
          setBounds: {
            x: 300,
            y: 300,
            width: 600,
            height: 150,
            thickness: 32
          }
        }
      });
    }

    preload () {
      console.info('preload-SceneB');
    }

    create () {
      this.impact.add.image(300, 300, 'gem').setActive().setVelocity(300, 200).setBounce(1);
    }
  }
})();
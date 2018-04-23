(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          gravity: {
            scale: 0
          },
          plugins: {
            attractors: true
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
      this.load.image('sun', 'assets/tests/space/sun.png');
      this.load.image('alien', 'assets/sprites/space-baddie.png');
    }

    create () {
      // You can enable the Attractors plugin either via the game config (see above), or explicitly in code:
      // this.matter.system.enableAttractorPlugin();
      //
      this.matter.world.setBounds();
      //
      this.matter.add.imageStack('alien', null, 0, 500, 50, 2, 0, 0, {
        mass: 0.5,
        ignorePointer: true
      });
      //
      let sun = this.matter.add.image(400, 200, 'sun', null, {
        shape: {
          type: 'circle',
          radius: 64
        },
        plugin: {
          attractors: [
            (bodyA, bodyB) => {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                y: (bodyA.position.y - bodyB.position.y) * 0.000001
              }
            }
          ]
        }
      });
      //
      this.matter.add.mouseSpring();
    }

    update () {
    }

    render () {
    }
  }
})();
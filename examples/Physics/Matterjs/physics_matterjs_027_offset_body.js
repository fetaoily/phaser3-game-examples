(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            y: 0.6
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
      this.load.image('triangle', 'assets/sprites/triangle.png');
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      let shapes = {
        'triangle': [
          [
            {x: 99, y: 79}, {x: 77, y: 118}, {x: 124, y: 118}
          ]
        ]
      };
      //
      let triangle = this.matter.add.sprite(400, 100, 'triangle', null, {
        shape: {type: 'fromVerts', verts: shapes.triangle},
        render: {sprite: {xOffset: 0.30, yOffset: 0.15}}
      });
      //
      triangle.setAngle(16);
      triangle.setBounce(0.9);
      //
      this.matter.add.image(400, 550, 'platform', null, {isStatic: true});
    }

    update () {
    }
  }
})();
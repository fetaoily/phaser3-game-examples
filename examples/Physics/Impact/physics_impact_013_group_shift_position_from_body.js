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
          gravity: 200,
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
      this.load.image('sky', 'assets/skies/deepblue.png');
      this.load.image('ball', 'assets/demoscene/ball-tlb.png');
    }

    create () {
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      //
      this.add.image(0, 0, 'sky').setOrigin(0);
      //
      this.group = this.add.group();
      this.group.createMultiple({key: 'ball', frameQuantity: 64});
      //
      // If you don't set the body as active it won't collide with the world bonds
      let balls = this.impact.add.body(200, 100).setActive().setVelocity(300, 200).setBounce(0.95);
      //
      // Set a body size of 1x1
      balls.setBodySize(1, 1);
      //
      let ballList = this.group.getChildren();
      balls.body.updateCallback = (body) => {
        let ball = ballList.shift();
        if (ball) {
          ball.x = body.pos.x;
          ball.y = body.pos.y;
        }
        // this.group.shiftPosition(body.pos.x, body.pos.y);
      };
      // Click to give the balls a boost:)
      this.input.on('pointerdown', () => {
        balls.setVelocity(-300);
      })
    }

    update () {
    }

    render () {
    }
  }
})();
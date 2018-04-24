(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
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
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      let block = this.matter.add.image(400, 100, 'block');
      block.setFriction(0.05);
      block.setFrictionAir(0.0005);
      block.setBounce(0.9);
      //
      let ground = this.matter.add.image(400, 500, 'platform', null, {restitution: 0.4, isStatic: true});
      //
      this.input.on('pointerdown', (pointer) => {
        if (pointer.y > 300) {
          block.setVelocity(0, -10);
        } else if (pointer.x < 400) {
          block.setVelocityX(-8);
        } else {
          block.setVelocityX(8);
        }
      });
    }

    update () {
    }

    render () {
    }
  }
})();
(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {debug: true}
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
      this.matter.add.image(325, -100, 'block');
      this.matter.add.image(400, 300, 'block');
      this.matter.add.image(450, 50, 'block');
      //
      let platform = this.matter.add.image(400, 550, 'platform', null, {isStatic: true}).setName('platform');
      //
      this.input.once('pointerup', () => {
        platform.destroy();
      });
      //
      this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
        if (bodyA.gameObject.name === 'platform') {
          bodyA.gameObject.setScale(2, 0.5);
        }
        if (bodyB.gameObject.name === 'platform') {
          bodyB.gameObject.setScale(2, 0.5);
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
(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      scene: [Scene1, Scene2]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class Scene1 extends ErtaoGameScene {
    constructor () {
      super({
        key: 'scene1',
        active: true
      });
    }

    preload () {
      this.load.spritesheet('balls', 'assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17});
    }

    create () {
      this.input.on('pointerdown', (pointer) => {
        this.add.image(pointer.x, pointer.y, 'balls', Phaser.Math.Between(0, 5));
      }, this);
    }

    update () {
    }

    render () {
    }
  }

  class Scene2 extends ErtaoGameScene {
    constructor () {
      super({
        key: 'scene2', active: true
      });
    }
  }

})();
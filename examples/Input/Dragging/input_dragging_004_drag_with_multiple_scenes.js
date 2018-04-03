(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      scene: [GameScene, UIScene]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class GameScene extends ErtaoGameScene {
    constructor () {
      super({
        key: 'GameScene'
      });
    }

    preload () {
      this.load.image('box', '/assets/sprites/128x128-v2.png');
    }

    create () {
      let box = this.add.image(400, 300, 'box').setInteractive();
      box.on('pointerdown', () => {
        box.tint = Math.random() * 0xffffff;
      });
    }

    update () {
    }

    render () {
    }
  }

  class UIScene extends ErtaoGameScene {
    constructor () {
      super({
        key: 'UIScene', active: true
      });
    }

    preload () {
      this.load.image('eye', '/assets/pics/lance-overdose-loader-eye.png');
    }

    create () {
      let image = this.add.sprite(200, 300, 'eye').setInteractive();
      //
      this.input.setDraggable(image);
      //
      this.input.on('dragstart', (requestPointerLock, gameObject) => {
        gameObject.setTint(0xff0000);
      });
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.input.on('dragend', (requestPointerLock, gameObject) => {
        gameObject.clearTint();
      });
    }

    update () {
    }

    render () {
    }
  }
})();
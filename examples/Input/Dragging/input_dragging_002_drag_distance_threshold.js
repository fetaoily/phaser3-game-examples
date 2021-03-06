(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
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
      this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
    }

    create () {
      let image = this.add.sprite(200, 300, 'eye').setInteractive();
      //
      this.input.setDraggable(image);
      //
      this.input.dragDistanceThreshold = 16;
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setTint(0xff0000);
        console.info('dragstart')
      });
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.input.on('dragend', (requestPointerLock, gameObject) => {
        console.info('dragend');
        gameObject.clearTint();
      });
    }

    update () {
    }

    render () {
    }
  }
})();
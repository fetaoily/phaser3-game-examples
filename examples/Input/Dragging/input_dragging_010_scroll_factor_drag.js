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
      this.image1 = this.add.sprite(200, 300, 'eye').setInteractive();
      this.image2 = this.add.sprite(400, 300, 'eye').setInteractive();
      this.image3 = this.add.sprite(600, 300, 'eye').setInteractive();
      //
      this.input.setDraggable([this.image1, this.image2, this.image3]);
      //
      this.image1.setScrollFactor(1);
      this.image2.setScrollFactor(0.7);
      this.image3.setScrollFactor(0.5);
      //
      this.input.on('gameobjectover', (pointer, gameObject) => {
        gameObject.setTint(0x00ff00);
      });
      //
      this.input.on('gameobjectout', (pointer, gameObject) => {
        gameObject.clearTint();
      });
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setTint(0xff0000);
        this.children.bringToTop(gameObject);
      });
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.input.on('dragend', (pointer, gameObject) => {
        gameObject.clearTint();
      });
    }

    update () {
    }

    render () {
    }
  }
})();
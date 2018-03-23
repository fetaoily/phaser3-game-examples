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
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
      this.rect = null;
      this.group = null;
      this.circle = null;
      this.i = 0;
    }

    preload() {
      this.load.spritesheet('balls', '/assets/sprites/balls.png', {
        frameWidth: 17,
        frameHeight: 17
      });
    }

    create() {
      this.rect = new Phaser.Geom.Rectangle(64, 32, 100, 512);
      //
      this.group = this.add.group({
        key: 'balls',
        frame: [0, 1, 2, 3, 4, 5],
        frameQuantity: 10
      });
      this.i = 0;
      //
      this.tweens.add({
        targets: this.rect,
        x: 200,
        y: 200,
        width: 512,
        height: 100,
        delay: 2000,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
      });
    }

    update() {
      Phaser.Actions.PlaceOnRectangle(
        this.group.getChildren(), // items
        this.rect, // rect
        this.i // shift=1
      );
      this.i++;
      if (this.i === this.group.length) {
        this.i = 0;
      }
    }

    render() {}
  }
})();

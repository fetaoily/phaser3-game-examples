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
      this.group = null;
    }

    preload() {
      this.load.spritesheet('diamonds', '/assets/sprites/diamonds32x24x5.png', {
        frameWidth: 32,
        frameHeight: 24
      });
    }

    create() {
      this.group = this.add.group({
        key: 'diamonds',
        frame: 3,
        frameQuantity: 50,
        setXY: { x: 32, y: 32, stepX: 14 }
      });
      //
      Phaser.Actions.Spread(
        this.group.getChildren(), // items
        'alpha', // property
        0, // min
        1, // max
        false // inc
      );
    }

    update() {}

    render() {}
  }
})();

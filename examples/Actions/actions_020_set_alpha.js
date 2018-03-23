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
        // frame: 0,
        frame: Phaser.Math.Between(0, 4),
        frameQuantity: 50,
        setXY: { x: 32, y: 32, stepX: 14 }
      });
      //
      Phaser.Actions.SetAlpha(this.group.getChildren(), 0, 1 / 50);
    }

    update() {}

    render() {}
  }
})();

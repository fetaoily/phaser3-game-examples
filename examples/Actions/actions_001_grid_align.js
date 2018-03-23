(() => {
  'use strict';

  let game;
  let gameConfig;

  window.onload = () => {
    window.gameConfig = gameConfig = {
      scene: [PlayGame]
    };
    window.game = game = new NewGame(gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    preload() {
      this.load.spritesheet('diamonds', '/assets/sprites/diamonds32x24x5.png', {
        frameWidth: 32,
        frameHeight: 24
      });
    }

    create() {
      let group = this.add.group({
        key: 'diamonds',
        frame: [0, 1, 2, 3, 4],
        frameQuantity: 20
      });
      //
      Phaser.Actions.GridAlign(group.getChildren(), {
        width: 10,
        height: 10,
        cellWidth: 32,
        cellHeight: 32,
        x: 100,
        y: 100
      });
    }

    update() {}

    render() {}
  }
})();

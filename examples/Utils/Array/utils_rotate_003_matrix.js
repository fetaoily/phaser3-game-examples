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
    }

    create () {
      let matrix = [
        [1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 4],
        [2, 0, 1, 2, 0, 4],
        [2, 0, 3, 4, 0, 4],
        [2, 0, 0, 0, 0, 4],
        [3, 3, 3, 3, 3, 3]
      ];

      console.info(Phaser.Utils.Array.Matrix.MatrixToString(matrix));

      matrix = Phaser.Utils.Array.Matrix.RotateRight(matrix);
      console.info('\n');
      console.info(Phaser.Utils.Array.Matrix.MatrixToString(matrix));
    }

    update () {
    }
  }
})();
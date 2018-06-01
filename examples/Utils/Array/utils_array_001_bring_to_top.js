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
      let data = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      this.add.text(10, 10, 'Before: ' + data.join('-'), { font: '16px Courier', fill: '#00ff00' });
      Phaser.Utils.Array.BringToTop(data, 'c');
      this.add.text(10, 40, 'After: ' + data.join('-'), { font: '16px Courier', fill: '#00ff00' });
    }

    update () {
    }
  }
})();
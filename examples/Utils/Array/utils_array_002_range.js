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
      let a = ['a', 'b'];
      let b = [1, 2];
      //
      let out = Phaser.Utils.Array.Range(a, b, { repeat: -1, max: 10 });
      out.forEach((e) => {
        console.info(e.a, e.b);
      });
    }

    update () {
    }
  }
})();
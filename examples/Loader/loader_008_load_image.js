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
      // this.load.image('taikodrummaster', 'assets/pics/taikodrummaster.jpg');
      // this.load.image('sukasuka-chtholly', 'assets/pics/sukasuka-chtholly.png');

      // this.load.path = 'assets/pics/';
      // this.load.image([
      //   {key: 'sukasuka-chtholly'},
      //   {key: 'taikodrummaster', extension: 'jpg'}
      // ]);

      this.load.image({key: 'taikodrummaster', file: 'assets/pics/taikodrummaster.jpg'});
      this.load.image({key: 'sukasuka-chtholly', file: 'assets/pics/sukasuka-chtholly.png'});
      //
      // Default extension is png, so specify a new one:
      this.load.image({key: 'taikordummaster', extension: 'jpg'});

    }

    create () {
      this.add.image(400, 300, 'taikodrummaster');
      this.add.image(400, 500, 'sukasuka-chtholly');
    }

    update () {
    }

    render () {
    }
  }
})();
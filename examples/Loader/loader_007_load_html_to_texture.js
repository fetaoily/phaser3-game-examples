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
      this.load.html('test1', '/assets/html/test1.html', 512, 512);
    }

    create () {
      this.image = this.add.image(400, 300, 'test1');
    }

    update () {
      this.image.rotation += 0.01;
    }

    render () {
    }
  }


})();
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
      this.iter = 0;
      this.image = null;
    }

    preload () {
      this.load.image('einstein', 'assets/pics/ra-einstein.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'einstein');
      //
      this.cameras.main.setViewport(200, 150, 400, 300);
    }

    update () {
      this.image.x = Math.sin(this.iter) * 200;
      this.image.y = Math.cos(this.iter) * 200;
      //
      this.iter += 0.04;
    }

    render () {
    }
  }
})();
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
      this.load.image('einstein', 'assets/pics/ra-einstein.png');
    }

    create () {
      this.image = this.add.image(200, 150, 'einstein');
      this.cameras.main.setSize(400, 300);
      //
      this.cameras.add(400, 0, 400, 300);
      this.cameras.add(0, 300, 400, 300);
      this.cameras.add(400, 300, 400, 300);
    }

    update () {
      this.image.rotation += 0.01;
    }

    render () {
    }
  }
})();
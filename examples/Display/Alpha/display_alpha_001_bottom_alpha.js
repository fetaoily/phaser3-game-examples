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
      this.load.image('turkey', 'assets/pics/turkey-1985086.jpg');
      this.load.image('face', 'assets/pics/bw-face.png');
    }

    create () {
      let face = this.add.image(400, 300, 'face');
      let sea = this.add.image(400, 300, 'turkey');
      // to left, top right ,bottom left ,bottom right
      sea.setAlpha(0, 0, 0, 0)
    }

    update () {
    }

    render () {
    }
  }
})();
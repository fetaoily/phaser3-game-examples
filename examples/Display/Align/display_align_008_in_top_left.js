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
      this.load.image('pic', 'assets/pics/barbarian-loading.png');
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let pic = this.add.image(0, 0, 'pic');
      let block = this.add.image(0, 0, 'block');
      //
      Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));
      //
      Phaser.Display.Align.In.TopCenter(block, pic);
    }

    update () {
    }

    render () {
    }
  }
})();
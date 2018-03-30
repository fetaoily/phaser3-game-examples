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
      let pic = this.pic = this.add.image(0, 0, 'pic');
      let block = this.block = this.add.image(0, 0, 'block');
      //
      Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));
      //
      Phaser.Display.Align.In.TopRight(block, pic);
    }

    update () {
      this.pic.angle -= 0.1;
      this.block.angle += 0.1;
    }

    render () {
    }
  }
})();
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
      this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');
    }

    create () {
      let atlasTexture = this.textures.get('megaset');
      let frames = atlasTexture.getFrameNames();
      for (let i = 0; i < frames.length; i++) {
        let x = Phaser.Math.Between(0, 800);
        let y = Phaser.Math.Between(0, 600);
        //
        this.add.image(x, y, 'megaset', frames[i]);
      }
    }

    update () {
    }

    render () {
    }
  }
})();
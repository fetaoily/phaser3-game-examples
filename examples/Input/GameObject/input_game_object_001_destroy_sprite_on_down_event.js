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
      this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
    }

    create () {
      this.createCards();
      //
      this.input.on('gameobjectdown', (pointer, gameObject) => {
        gameObject.destroy();
      })
    }

    update () {
    }

    render () {
    }

    createCards () {
      let frames = this.textures.get('cards').getFrameNames();
      for (let i = 0; i < 64; i++) {
        let x = Phaser.Math.Between(0, 800);
        let y = Phaser.Math.Between(0, 600);
        let s = Phaser.Math.FloatBetween(0.5, 1);
        //
        this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setScale(s).setInteractive();
      }
    }
  }
})();
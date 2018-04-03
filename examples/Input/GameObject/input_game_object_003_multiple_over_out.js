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
      this.input.on('gameobjectover', (pointer, gameObject) => {
        gameObject.setTint(0xff0000);
        this.tweens.add({
          targets: gameObject,
          alpha: 0,
          scaleX: 0,
          scaleY: 0
        });
      });
      this.input.on('gameobjectout', (pointer, gameObject) => {
        gameObject.clearTint();
        this.tweens.add({
          targets: gameObject,
          alpha: Phaser.Math.Between(0.4, 0.6),
          scaleX: Phaser.Math.Between(0.1, 1),
          scaleY: Phaser.Math.Between(0.1, 1)
        });
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
        let s = Phaser.Math.FloatBetween(0.4, 0.6);
        //
        this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setScale(s).setInteractive();
      }
    }
  }
})();
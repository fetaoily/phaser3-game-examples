(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      width: 1024,
      height: 600,
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
      // Create a stack of random cards
      let frames = this.textures.get('cards').getFrameNames();
      let x = 80;
      let y = 100;
      for (let i = 0; i < 64; i++) {
        this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        x += 3;
        y += 6;
      }
      this.input.setTopOnly(false);
      this.input.on('pointerdown', (pointer, gameObjects) => {
        // console.info(gameObjects);
        // gameObjects is an array of ALL GameObjects that were under the pointer
        // So let's tween them all :)
        if (gameObjects.length > 0) {
          this.tweens.add({
            targets: gameObjects,
            x: {value: 1100, duration: 1500, ease: 'Power2'},
            delay: (i, total, target) => {
              return i * 100;
            }
          });
        }
      }, this);
    }

    update () {
    }

    render () {
    }
  }
})();
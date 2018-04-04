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
      let x = 100;
      let y = 100;
      for (let i = 0; i < 64; i++) {
        this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        x += 4;
        y += 4;
      }
      //
      this.input.on('gameobjectdown', (pointer, gameObject) => {
        // Will contain the top-most Game Object (in the display list)
        this.tweens.add({
          targets: gameObject,
          x: {value: 1100, duration: 1500, ease: 'Power2'},
          y: {value: 500, duration: 500, ease: 'Bounce.easeOut', delay: 150}
        })
      }, this);
    }

    update () {
    }

    render () {
    }
  }
})();
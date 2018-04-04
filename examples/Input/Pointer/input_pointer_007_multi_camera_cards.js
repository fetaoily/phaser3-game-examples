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
      let x = 0;
      let y = 0;
      for (let i = 0; i < 64; i++) {
        this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        x += 4;
        y += 4;
      }
      // Shrink the main camera
      this.cam1 = this.cameras.main.setSize(511, 299);
      this.cam1.setZoom(0.5).setBackgroundColor('#000000');
      //
      this.cam2 = this.cameras.add(513, 0, 511, 299);
      this.cam2.setZoom(0.5).setBackgroundColor('#0000aa');
      //
      this.cam3 = this.cameras.add(0, 301, 511, 299);
      this.cam3.setZoom(0.5).setBackgroundColor('#00aa00');
      //
      this.cam4 = this.cameras.add(513, 301, 511, 299);
      this.cam4.setZoom(0.5).setBackgroundColor('#aa0000');
      this.cam4.setRotation(0.8);
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
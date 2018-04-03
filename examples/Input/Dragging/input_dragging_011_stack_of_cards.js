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
      // Create a stack of random cards
      let frames = this.textures.get('cards').getFrameNames();
      let x = 100;
      let y = 100;
      //
      for (let i = 0; i < 64; i++) {
        let image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        //
        this.input.setDraggable(image);
        //
        x += 4;
        y += 4;
      }
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        this.children.bringToTop(gameObject);
      }, this);
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

    }

    update () {
    }

    render () {
    }
  }
})();
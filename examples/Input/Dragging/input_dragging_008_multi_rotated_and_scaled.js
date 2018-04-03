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
      this.cards = this.add.group();
      this.frames = this.textures.get('cards').getFrameNames();
      //
      for (let i = 0; i < 64; i++) {
        let x = Phaser.Math.Between(0, 1024);
        let y = Phaser.Math.Between(0, 600);
        //
        let image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(this.frames));
        image.setInteractive();
        image.setScale(Phaser.Math.FloatBetween(0.25, 0.75));
        image.setAngle(Phaser.Math.Between(0, 359));
        //
        this.input.setDraggable(image);
        //
        this.cards.add(image);
      }
      //
      this.input.on('dragstart', (requestPointerLock, gameObject) => {
        this.children.bringToTop(gameObject);
      }, this);
      //
      this.input.on('drag', (requestPointerLock, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
    }

    update () {
      Phaser.Actions.Rotate(this.cards.getChildren(), 0.01);
    }

    render () {
    }
  }
})();
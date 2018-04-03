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
      let frames = this.textures.get('cards').getFrameNames();
      let image = this.add.image(400, 300, 'cards', 'clubsKing');
      let image2 = this.add.image(400 + 10, 300 + 10, 'cards', Phaser.Math.RND.pick(frames));
      // Rotate it
      image.setAngle(45);
      //
      // Scale it
      image.setScale(2);
      //
      // Make interactive
      image.setInteractive();
      image2.setInteractive();
      //
      // Make draggable
      this.input.setDraggable(image);
      this.input.setDraggable(image2);
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
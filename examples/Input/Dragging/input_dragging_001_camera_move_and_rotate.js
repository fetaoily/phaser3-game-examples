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
      this.load.atlas('cards', '/assets/atlas/cards.png', '/assets/atlas/cards.json');
    }

    create () {
      this.cards = this.add.group();
      this.frames = this.textures.get('cards').getFrameNames();
      for (let i = 0; i < 200; i++) {
        let x = Phaser.Math.Between(0, 2048);
        let y = Phaser.Math.Between(0, 1200);
        let image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(this.frames));
        image.setInteractive();
        image.setScale(Phaser.Math.FloatBetween(0.25, 1.0));
        image.setScrollFactor(image.scaleX);
        image.setDepth(image.scrollFactorX);
        image.setAngle(Phaser.Math.Between(0, 359));
        //
        this.input.setDraggable(image);
        //
        this.cards.add(image);
      }
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.controlConfig = {
        camera: this.cameras.main,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        acceleration: 0.04,
        drag: 0.005,
        maxSpeed: 0.7
      };
      //
      this.controls = new Phaser.Cameras.Controls.Smoothed(this.controlConfig);
      //
      this.cameras.main.setBounds(0, 0, 2048, 1200);

    }

    update (time, delta) {
      this.controls.update(delta);
      Phaser.Actions.Rotate(this.cards.getChildren(), 0.01);
    }

    render () {
    }
  }
})();
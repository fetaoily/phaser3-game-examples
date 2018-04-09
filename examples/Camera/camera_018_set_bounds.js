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
      this.load.image('pic', 'assets/pics/the-end-by-iloe-and-made.jpg');
    }

    create () {
      this.add.image(0, 0, 'pic').setOrigin(0);
      // Set the camera bounds to be the size of the image
      this.cameras.main.setBounds(0, 0, 1920, 1080);
      // Camera controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.controlConfig = {
        camera: this.cameras.main,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls= window.controls = new Phaser.Cameras.Controls.Smoothed(this.controlConfig);
    }

    update (time, delta) {
      this.controls.update(delta);
    }

    render () {
    }
  }
})();
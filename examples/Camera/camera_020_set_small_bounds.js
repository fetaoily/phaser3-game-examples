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
      this.load.image('pic', 'assets/pics/lazur-skkaay3.png');
    }

    create () {
      this.add.image(0, 200, 'pic').setOrigin(0);
      // Set the camera bounds to be the size of the image
      // In this case we can scroll horizontally, but not vertically
      this.cameras.main.setBounds(0, 0, 1280, 200);
      // Camera controls
      let cursors = this.input.keyboard.createCursorKeys();
      let controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
    }

    update (time, delta) {
      this.controls.update(delta);
    }

    render () {
    }
  }
})();
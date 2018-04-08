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
      this.cursors = null;
      this.image = null;
      this.camera = null;
      this.text = null;
      this.position = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/128x128.png');
    }

    create () {
      this.image = this.add.image(400, 300, 'block');
      // the position of the image in 3D space
      this.position = new Phaser.Math.Vector4();
      //
      this.camera = this.cameras3d.addOrthographicCamera(800, 600).setPosition(0, 0, 200);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'});
    }

    update () {
      if (this.cursors.left.isDown) {
        this.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.camera.x += 4;
      }
      //
      if (this.cursors.up.isDown) {
        if (this.cursors.shift.isDown) {
          this.camera.y -= 4;
        } else {
          this.camera.z -= 4;
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          this.camera.y += 4;
        } else {
          this.camera.z += 4;
        }
      }
      //
      this.camera.project(this.position, this.image);
      //
      this.image.setScale(this.image.z);
      //
      this.text.setText([
        'camera.x: ' + this.camera.x,
        'camera.y: ' + this.camera.y,
        'camera.z: ' + this.camera.z,
        '',
        'image.x: ' + this.image.x,
        'image.y: ' + this.image.y,
        'image.z: ' + this.image.z
      ]);
    }

    render () {
    }
  }
})();
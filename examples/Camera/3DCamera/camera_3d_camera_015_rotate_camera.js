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
      this.xAxis = null;
      this.yAxis = null;
      this.zAxis = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/128x128-v2.png');
    }

    create () {
      this.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
      //
      this.image = this.camera.create(0, 0, 0, 'block');
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'});
      //
      this.xAxis = new Phaser.Math.Vector3(1, 0, 0);
      this.yAxis = new Phaser.Math.Vector3(0, 1, 0);
      this.zAxis = new Phaser.Math.Vector3(0, 0, 1);
    }

    update () {
      if (this.cursors.left.isDown) {
        this.camera.rotate(0.001, this.xAxis);
        // this.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.camera.rotate(-0.001, this.xAxis);
        // this.camera.x += 4;
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
      this.text.setText([
        'camera.x: ' + this.camera.x,
        'camera.y: ' + this.camera.y,
        'camera.z: ' + this.camera.z,
        '',
        'image.x: ' + this.image.gameObject.x,
        'image.y: ' + this.image.gameObject.y,
        'image.z: ' + this.image.gameObject.z
      ]);
    }

    render () {
    }
  }
})();
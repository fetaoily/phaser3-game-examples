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
      this.text = null;
      this.camera = null;
      this.cursors = null;
      this.transform = null;
      this.xAxis = null;
      this.yAxis = null;
      this.zAxis = null;
      this.isPosition = true;
    }

    preload () {
      this.load.image('particle', 'assets/sprites/mushroom2.png');
    }

    create () {
      this.graphics = this.add.graphics();
      //
      this.camera = this.cameras3d.add(85).setZ(300).setPixelScale(128);
      //
      let sprites = this.camera.createRect({x: 4, y: 4, z: 16}, {x: 48, y: 48, z: 32}, 'particle');
      // Our rotation matrix
      this.transform = new Phaser.Math.Matrix4().rotateX(-0.01).rotateY(-0.02).rotateZ(0.01);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'});
      //
      this.xAxis = new Phaser.Math.Vector3(1, 0, 0);
      this.yAxis = new Phaser.Math.Vector3(0, 1, 1);
      this.zAxis = new Phaser.Math.Vector3(0, 0, 1);
    }

    update () {
      this.camera.transformChildren(this.transform);
      //
      this.updateCamControls();
    }

    render () {
    }

    updateCamControls () {
      if (this.cursors.left.isDown) {
        if (this.isPosition) {
          this.camera.x -= 4;
        } else {
          this.camera.x += 4;
        }
      } else if (this.cursors.right.isDown) {
        if (this.isPosition) {
          this.camera.x += 4;
        } else {
          this.camera.rotate(-0.01, this.xAxis);
        }
      }
      //
      if (this.cursors.up.isDown) {
        if (this.cursors.shift.isDown) {
          if (this.isPosition) {
            this.camera.y += 4;
          } else {
            this.camera.rotate(0.01, this.yAxis);
          }
        } else {
          if (this.isPosition) {
            this.camera.z += 4;
          } else {
            this.camera.rotate(0.01, this.zAxis);
          }
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          if (this.isPosition) {
            this.camera.y -= 4;
          } else {
            this.camera.rotate(-0.01, this.yAxis);
          }
        } else {
          if (this.isPosition) {
            this.camera.z -= 4;
          } else {
            this.camera.rotate(-0.01, this.zAxis);
          }
        }
      }
      //
      this.text.setText([
        'camera.x: ' + this.camera.x,
        'camera.y: ' + this.camera.y,
        'camera.z: ' + this.camera.z
      ]);
    }
  }
})();
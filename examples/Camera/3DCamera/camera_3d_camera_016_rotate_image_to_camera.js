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
      this.camera = null;
      this.text = null;
      this.sprite3D = null;
      this.xAxis = null;
      this.yAxis = null;
      this.zAxis = null;
      this.isPosition = false;
    }

    preload () {
      this.load.image('block', 'assets/sprites/128x128-v2.png');
      this.load.spritesheet('positionButton', 'assets/ui/position-button.png', {frameWidth: 74, frameHeight: 23});
      this.load.spritesheet('rotationButton', 'assets/ui/rotation-button.png', {frameWidth: 74, frameHeight: 23});
    }

    create () {
      this.camera = this.cameras3d.add(90).setPosition(0, 0, 200);
      //
      this.sprite3D = this.camera.create(0, 0, 0, 'block');
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.pButton = this.add.image(10, 10, 'positionButton', 1).setOrigin(0).setDepth(1000000).setName('position').setInteractive();
      this.rButton = this.add.image(100, 10, 'rotationButton', 0).setOrigin(0).setDepth(1000000).setName('rotation').setInteractive();
      //
      this.input.on('gameobjectdown', (pointer, gameObject) => {
        if (gameObject.name === 'position' && !this.isPosition) {
          // Enable position
          this.pButton.setFrame(0);
          this.rButton.setFrame(1);
          this.isPosition = true;
        } else if (gameObject.name === 'rotation' && this.isPosition) {
          // Enable rotation
          this.pButton.setFrame(1);
          this.rButton.setFrame(0);
          this.isPosition = false;
        }
      });
      //
      this.text = this.add.text(10, 48, {font: '16px Courier', fill: '#00ff00'}).setDepth(1000000);
      //
      this.xAxis = new Phaser.Math.Vector3(1, 0, 0);
      this.yAxis = new Phaser.Math.Vector3(0, 1, 0);
      this.zAxis = new Phaser.Math.Vector3(0, 0, 1);
    }

    update () {
      if (this.cursors.left.isDown) {
        if (this.isPosition) {
          this.camera.x -= 4;
        } else {
          this.camera.rotate(0.01, this.xAxis);
          this.sprite3D.gameObject.rotation += 0.01;
        }
      } else if (this.cursors.right.isDown) {
        if (this.isPosition) {
          this.camera.x += 4;
        } else {
          this.camera.rotate(-0.01, this.xAxis);
          this.sprite3D.gameObject.rotation -= 0.01;
        }
      }
      //
      if (this.cursors.up.isDown) {
        if (this.cursors.shift.isDown) {
          if (this.isPosition) {
            this.camera.z += 4;
          } else {
            this.camera.rotate(0.01, this.zAxis);
            this.sprite3D.gameObject.rotation += 0.01;
          }
        } else {
          if (this.isPosition) {
            this.camera.y += 4;
          } else {
            this.camera.rotate(0.01, this.yAxis);
            this.sprite3D.gameObject.rotate += 0.01;
          }
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          if (this.isPosition) {
            this.camera.z -= 4;
          } else {
            this.camera.rotate(-0.01, this.zAxis);
            this.sprite3D.gameObject.rotation -= 0.01;
          }
        } else {
          if (this.isPosition) {
            this.camera.y -= 4;
          } else {
            this.camera.rotate(-0.01, this.yAxis);
            this.sprite3D.gameObject.rotation -= 0.01;
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

    render () {
    }
  }
})();
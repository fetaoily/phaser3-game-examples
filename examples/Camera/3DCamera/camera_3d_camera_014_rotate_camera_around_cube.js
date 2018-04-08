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
      this.load.image('block', 'assets/sprites/block.png');
      this.load.spritesheet('positionButton', 'assets/ui/position-button.png', {frameWidth: 74, frameHeight: 23});
      this.load.spritesheet('rotationButton', 'assets/ui/rotation-button.png', {frameWidth: 74, frameHeight: 23});
    }

    create () {
      this.camera = this.cameras3d.add(90).setPosition(0, 0, 500);
      //
      this.createDotCube(this.camera, 6, 64, 'block');
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.pButton = this.add.image(10, 10, 'positionButton', 0).setOrigin(0).setDepth(1000000).setName('position').setInteractive();
      this.rButton = this.add.image(100, 10, 'rotationButton', 1).setOrigin(0).setDepth(1000000).setName('rotation').setInteractive();
      //
      this.input.on('gameobjectdown', (requestPointerLock, gameObject) => {
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
      this.text = this.add.text(10, 48, '', {font: '16px Courier', fill: '#00ff00'}).setDepth(1000000);
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
            this.camera.z += 4;
          } else {
            this.camera.rotate(0.01, this.zAxis);
          }
        } else {
          if (this.isPosition) {
            this.camera.y += 4;
          } else {
            this.camera.rotate(0.01, this.yAxis);
          }
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          if (this.isPosition) {
            this.camera.z -= 4;
          } else {
            this.camera.rotate(-0.01, this.zAxis);
          }
        } else {
          if (this.isPosition) {
            this.camera.y -= 4;
          } else {
            this.camera.rotate(-0.01, this.yAxis);
          }
        }
      }
      //
      this.text.setText([
        'camera.x: ' + this.camera.x,
        'camera.y: ' + this.camera.y,
        'camera.z: ' + this.camera.z
      ])
    }

    render () {
    }

    // Create a dot cube centered on 0x0x0
    createDotCube (camera, size, spacing, key, frame) {
      // + Adjust for origin 0.5
      let i0 = 0.5 - (size / 2);
      let i1 = (size / 2);
      //
      for (let z = i0; z < i1; z++) {
        for (let y = i0; y < i1; y++) {
          for (let x = i0; x < i1; x++) {
            let bx = x * spacing;
            let by = y * spacing;
            let bz = z * spacing;
            //
            this.camera.create(bx, by, bz, key, frame);
          }
        }
      }
    }
  }
})();
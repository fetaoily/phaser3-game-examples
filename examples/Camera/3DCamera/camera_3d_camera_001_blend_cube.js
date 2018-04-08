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
      this.text1 = null;
      this.camera = null;
      this.transform = null;
      this.xAxis = null;
      this.yAxis = null;
      this.zAxis = null;
      this.isPosition = true;
    }

    preload () {
      this.load.image('ball', 'assets/sprites/aqua_ball.png');
      this.load.image('ball2', 'assets/sprites/yellow_ball.png');
      this.load.image('block', 'assets/particles/red.png');
    }

    create () {
      this.graphics = this.add.graphics();
      // Setup a camera with 85 degree FOV
      this.camera = this.cameras3d.add(85).setZ(500).setPixelScale(128);
      //
      // let sprites = this.camera.createRect(6, 64, 'block');
      // let sprites = this.camera.createRect(6,64,'ball');
      let sprites = this.camera.createRect(6, 64, 'ball2');
      //
      for (let i = 0; i < sprites.length; i++) {
        sprites[i].gameObject.setBlendMode(Phaser.BlendModes.ADD);
      }
      // Our rotation matrix
      this.transform = new Phaser.Math.Matrix4().rotateX(-0.02).rotateY(-0.02).rotateZ(0.01);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', color: '#00ff00'});
      //
      this.xAxis = new Phaser.Math.Vector3(1, 0, 0);
      this.yAxis = new Phaser.Math.Vector3(0, 1, 0);
      this.zAxis = new Phaser.Math.Vector3(0, 0, 1);

    }

    update () {
      this.camera.transformChildren(this.transform);
      this.updateCamControls();
    }

    render () {
    }

    updateCamControls () {
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
            this.camera.y += 4;
          } else {
            this.camera.rotate(0.01, this.yAxis);
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
            this.camera.zAxis -= 4;
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
      ])
    }
  }
})();
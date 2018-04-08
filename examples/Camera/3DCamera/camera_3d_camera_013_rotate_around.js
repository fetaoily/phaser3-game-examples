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
      this.r = 0;
      this.cursors = null;
      this.camera = null;
      this.text = null;
      this.sprite3D = null;
      this.middle = null;
      this.axis = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/128x128-v2.png');
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      this.camera = this.cameras3d.add(80, 800, 600).setPosition(0, 0, 0);
      // Center this dot cube on 0x0x0
      for (let z = -3; z < 3; z++) {
        for (let y = -3; y < 3; y++) {
          for (let x = -3; x < 3; x++) {
            let bx = (x * 64);
            let by = (y * 64);
            let bz = (z * 64);
            //
            this.camera.create(bx, by, bz, 'ball');
          }
        }
      }
      //
      this.middle = new Phaser.Math.Vector3(0, 0, 0);
      this.axis = new Phaser.Math.Vector3(0, 0, 1);
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
      this.camera.rotateAround(this.middle, 0.001, this.axis);
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
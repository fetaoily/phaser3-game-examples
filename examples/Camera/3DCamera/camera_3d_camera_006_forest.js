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
      this.load.image('bg', 'assets/tests/camera3d/bg.png');
      this.load.image('horizon', 'assets/tests/camera3d/horizon-wide.png');
      this.load.image('tree', 'assets/tests/camera3d/tree.png');
    }

    create () {
      this.sky = this.add.image(400, 300, 'bg').setDepth(-5000);
      //
      this.horizon = this.add.image(400, 300, 'horizon').setDepth(-4000);
      //
      this.camera = this.cameras3d.add(20, 800, 600).setPosition(1500, -70, 10000);
      //
      for (let z = 0; z < 32; z++) {
        for (let x = 0; x < 32; x++) {
          let xDiff = Phaser.Math.Between(-40, 40);
          let zDiff = Phaser.Math.Between(-60, 60);
          //
          let bx = (x * 100) + xDiff;
          let bz = (z * 300) + zDiff;
          //
          this.camera.create(bx, 0, bz, 'tree');
        }
      }
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
          this.camera.y = Phaser.Math.Clamp(this.camera.y - 4, -200, 30);
        } else {
          this.camera.z -= 16;
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          this.camera.y = Phaser.Math.Clamp(this.camera.y + 4, -200, 30);
        } else {
          this.camera.z += 16;
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
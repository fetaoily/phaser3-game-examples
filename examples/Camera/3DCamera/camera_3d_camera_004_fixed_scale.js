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
      this.camera = null;
      this.cursors = null;
      this.road = null;
      this.speed = 3;
      this.startZ = null;
    }

    preload () {
      this.load.spritesheet('strip', 'assets/sprites/stripes800x32-v2.png', {frameWidth: 800, frameHeight: 32});
    }

    create () {
      this.camera = this.cameras3d.add(80).setPosition(0, -40, 300).setPixelScale(48);
      //
      this.road = this.camera.createRect({x: 1, y: 1, z: 32}, 24, 'strip', 0);
      //
      this.startZ = this.road[0].z;
      //
      for (let i = 0; i < this.road.length; i++) {
        let segment = this.road[i];
        //
        // segment.adjustScaleX = false;
        if (i % 2 === 1) {
          segment.gameObject.setFrame(1);
        }
      }
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'});
    }

    update () {
      // Scroll the road
      for (let i = 0; i < this.road.length; i++) {
        let segment = this.road[i];
        segment.z += this.speed;
        if (segment.z > (this.camera.z + 32)) {
          segment.z = this.startZ;
        }
      }
      //
      let obj = this.camera;
      if (this.cursors.left.isDown) {
        obj.x -= 4;
      } else if (this.cursors.right.isDown) {
        obj.x += 4;
      }
      //
      if (this.cursors.up.isDown) {
        if (this.cursors.shift.isDown) {
          obj.y -= 4;
        } else {
          obj.z -= 4;
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          obj.y += 4;
        } else {
          obj.z += 4;
        }
      }
      //
      this.camera.update();
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
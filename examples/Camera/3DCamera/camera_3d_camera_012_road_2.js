(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      backgroundColor: '#4848f8',
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
      this.background = null;
      this.road = null;
      this.trees = null;
      this.speed = 3;
      this.startZ = null;
    }

    preload () {
      this.load.spritesheet('bgStrip', 'assets/sprites/stripes800x32-bg.png', {frameWidth: 800, frameHeight: 32});
      this.load.spritesheet('roadStrip', 'assets/sprites/stripes800x32-layer.png', {frameWidth: 100, frameHeight: 32});
      this.load.image('treeLeft', 'assets/sprites/palm-tree-left.png');
      this.load.image('treeRight', 'assets/sprites/palm-tree-right.png');
    }

    create () {
      this.camera = this.cameras3d.add(90).setPosition(0, -40, 300).setPixelScale(200);
      //
      this.background = this.camera.createRect({x: 1, y: 1, z: 32}, 24, 'bgStrip', 0);
      //
      this.startZ = this.background[0].z;
      for (let i = 0; i < this.background.length; i++) {
        let segment = this.background[i];
        segment.gameObject.scaleX = 1;
        segment.adjustScaleX = false;
        if (i % 2 === 1) {
          segment.gameObject.setFrame(1);
        }
      }
      //
      this.road = this.camera.createRect({x: 1, y: 1, z: 32}, 24, 'roadStrip', 0);
      //
      for (let i = 0; i < this.road.length; i++) {
        let segment = this.road[i];
        if (i % 2 === 1) {
          segment.gameObject.setFrame(1);
        }
      }
      //
      this.trees = [];
      //
      for (let i = 0; i < 12; i++) {
        this.trees.push(this.camera.create(-40, -60, i * 128, 'treeLeft'));
        this.trees.push(this.camera.create(40, -60, i * 128, 'treeRight'));
      }
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'});
    }

    update () {
      // Scroll the road
      for (let i = 0; i < this.background.length; i++) {
        let segment = this.background [i];
        segment.z += this.speed;
        if (segment.z > (this.camera.z + 32)) {
          segment.z = this.startZ;
        }
      }
      //
      for (let i = 0; i < this.road.length; i++) {
        let segment = this.road[i];
        segment.z += this.speed;
        if (segment.z > (this.camera.z + 32)) {
          segment.z = this.startZ;
        }
        //
        if (this.cursors.left.isDown) {
          segment.x -= 1;
        } else if (this.cursors.right.isDown) {
          segment.x += 1;
        }
      }
      //
      for (let i = 0; i < this.trees.length; i++) {
        let segment = this.trees[i];
        segment.z += this.speed;
        if (segment.z > (this.camera.z + 32)) {
          segment.z = this.startZ;
        }
      }
      //
      let obj = this.camera;
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
      ])
    }

    render () {
    }
  }
})();
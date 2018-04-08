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
      this.load.image('tree', 'assets/tests/camera3d/tree.png');
    }

    create () {
      this.camera = this.cameras3d.add(80, 800, 600).setPosition(0, 0, 400);
      //
      this.sprite = this.camera.create(0, 0, 0, 'tree');
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.text = this.add.text(10, 10, '', {font: '16px Courier', color: '#000000'});
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
          this.camera.z += 16;
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.shift.isDown) {
          this.camera.y += 4;
        } else {
          this.camera.z -= 16;
        }
      }
      //
      this.sprite.gameObject.alpha = 1 - Phaser.Math.Percent(this.camera.z, 600, 1000);
      //
      this.text.setText([
            'a: ' + this.sprite.gameObject.alpha,
            'camera.z: ' + this.camera.z
          ]
      )
    }

    render () {
    }
  }
})();
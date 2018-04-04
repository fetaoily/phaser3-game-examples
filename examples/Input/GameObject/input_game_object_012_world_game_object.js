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
      this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
    }

    create () {
      for (let i = 0; i < 32; i++) {
        let x = Phaser.Math.Between(0, 2000);
        let y = Phaser.Math.Between(0, 2000);
        //
        this.add.sprite(x, y, 'eye').setInteractive();
      }
      //
      this.input.on('GAME_OBJECT_OVER_EVENT', (event) => {
        event.gameObject.setTint(0xff0000);
      });
      //
      this.input.on('GAME_OBJECT_OUT_EVENT', (event) => {
        event.gameObject.clearTint();
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.controlConfig = {
        camera: this.cameras.main,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.Smoothed(this.controlConfig);
      //
      this.cameras.main.setBackgroundColor('rgba(255,0,0,0.5)');
      this.cameras.main.setZoom(0.8);
      this.cameras.main.setRotation(Phaser.Math.DegToRad(10));
      //
      this.text1 = this.add.text(100, 200, 'x: 0 y: 0', {font: '18px Courier', fill: '#00ff00'}).setScrollFactor(0);
      this.text2 = this.add.text(100, 400, '', {font: '18px Courier', fill: '#00ff00'}).setScrollFactor(0);
      //
      this.input.keyboard.on('KEY_DOWN_Z', (event) => {
        console.info('KEY_DOWN_Z');
        this.cameras.main.setRotation(this.cameras.main.rotation + 0.01);
      }, 0, this);
      //
      this.input.keyboard.on('KEY_DOWN_X', (event) => {
        console.info('KEY_DOWN_X');
        this.cameras.main.setRotation(this.cameras.main.rotation - 0.01);
      }, 0, this);

    }

    update (time, delta) {
      this.controls.update(delta);
      //
      let cam = this.cameras.main;
      // Take a coordinate from screen space and convert it into World space within the Camera
      // let p = cam.screenToCamera({x: this.input.x, y: this.input.y});
      let p = this.input.activePointer.positionToCamera(cam);
      //
      this.text1.setText([
        'cx: ' + cam.scrollX,
        'cy: ' + cam.scrollY,
        '',
        'sx: ' + this.input.x,
        'sy: ' + this.input.y,
        '',
        'px: ' + p.x,
        'py: ' + p.y
      ]);
      //
      this.text2.setText([
        'a: ' + cam.matrix.matrix[0],
        'b: ' + cam.matrix.matrix[1],
        'c: ' + cam.matrix.matrix[2],
        'd: ' + cam.matrix.matrix[3],
        'tx: ' + cam.matrix.matrix[4],
        'ty: ' + cam.matrix.matrix[5]
      ])
    }

    render () {
    }
  }
})();
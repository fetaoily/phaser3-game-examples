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
      this.load.image('grid', 'assets/pics/uv-grid-diag.png');
    }

    create () {
      // The grid image is 1024 x 1024, let's draw 4 of them (2 bt 2)
      this.add.image(0, 0, 'grid').setOrigin(0);
      this.add.image(1024, 0, 'grid').setOrigin(0);
      this.add.image(0, 1024, 'grid').setOrigin(0);
      this.add.image(1024, 1024, 'grid').setOrigin(0);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      let controlConfig = {
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
      this.controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
      //
      let cam = this.cameras.main;
      //
      this.gui = new dat.GUI();
      //
      let help = {
        line1: 'Cursors to move',
        line2: 'Q & E to zoom'
      };
      //
      let f1 = this.gui.addFolder('Camera');
      f1.add(cam, 'x').listen();
      f1.add(cam, 'y').listen();
      f1.add(cam, 'scrollX').listen();
      f1.add(cam, 'scrollY').listen();
      f1.add(cam, 'rotation').min(0).step(0.01).listen();
      f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen();
      f1.add(help, 'line1');
      f1.add(help, 'line2');
      f1.open();
    }

    update (time, delta) {
      this.controls.update(delta);
    }

    render () {
    }
  }
})();
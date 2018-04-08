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
      this.load.image('volcano', 'assets/pics/the-end-by-iloe-and-made.jpg');
      this.load.image('hotdog', 'assets/sprites/hotdog.png');
    }

    create () {
      // A background image - scrolls with the camera at a 1:1 ratio
      this.add.image(0, 0, 'volcano');
      // A sprite, doesn't scroll with the camera (is fixed to camera)
      this.add.image(400, 300, 'hotdog').setScrollFactor(0);
      // From here down is just camera controls and feedback
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.controlConfig = {
        camera: this.cameras.main,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.Smoothed(this.controlConfig);
      //
      this.cam = this.cameras.main;
      //
      this.gui = new dat.GUI();
      //
      let help = {
        line1:'Cursors to move'
      };
      //
      let f1 = this.gui.addFolder('Camera');
      f1.add(this.cam,'x').listen();
      f1.add(this.cam,'y').listen();
      f1.add(this.cam,'scrollX').listen();
      f1.add(this.cam,'scrollY').listen();
      f1.add(this.cam,'rotation').min(0).step(0.01).listen();
      f1.add(help, 'line1');
      f1.open();
    }

    update (time,delta) {
    this.controls.update(delta);
    }

    render () {
    }
  }
})();
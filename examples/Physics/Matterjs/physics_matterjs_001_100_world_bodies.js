(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      pixelArt: true,
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            y: 0
          }
        }
      },
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
      this.worldWidth = 1600;
      this.worldHeight = 1200;
    }

    preload () {
    }

    create () {
      this.matter.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
      // Create loads of random bodies
      for (let i = 0; i < 100; i++) {
        let x = Phaser.Math.Between(0, this.worldWidth);
        let y = Phaser.Math.Between(0, this.worldHeight);
        if (Math.random() < 0.7) {
          let sides = Phaser.Math.Between(3, 14);
          let radius = Phaser.Math.Between(8, 50);
          //
          this.matter.add.polygon(x, y, sides, radius, {restitution: 0.9});
        } else {
          let width = Phaser.Math.Between(16, 128);
          let height = Phaser.Math.Between(8, 64);
          //
          this.matter.add.rectangle(x, y, width, height, {restitution: 0.9});
        }
      }
      //
      this.matter.add.mouseSpring();
      //
      let cursors = this.input.keyboard.createCursorKeys();
      let controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.6,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
      //
      this.input.keyboard.on('KEY_DOWN_Z', (event) => {
        this.cameras.main.rotation += 0.01;
      }, 0, this);
      //
      this.input.keyboard.on('KEY_DOWN_X', (event) => {
        this.cameras.main.rotation -= 0.01;
      }, 0, this);
      //
      let cam = this.cameras.main;
      //
      let gui = new dat.GUI();
      //
      let p1 = gui.addFolder('Pointer');
      p1.add(this.input, 'x').listen();
      p1.add(this.input, 'y').listen();
      p1.open();
      //
      let help = {
        line1: 'Cursors t omove',
        line2: 'Q & E to zoom',
        line3: ' Z & X to rotate'
      };
      //
      let f1 = gui.addFolder('Camera');
      f1.add(cam, 'x').listen();
      f1.add(cam, 'y').listen();
      f1.add(cam, 'scrollX').listen();
      f1.add(cam, 'scrollY').listen();
      f1.add(cam, 'rotation').min(0).step(0.01).listen();
      f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen();
      f1.add(help, 'line1');
      f1.add(help, 'line2');
      f1.add(help, 'line3');
      f1.open();
    }

    update (time, delta) {
      this.controls.update(delta);
    }

    render () {
    }
  }
})();
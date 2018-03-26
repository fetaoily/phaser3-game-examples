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
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
      this.gui = null;
      this.graphics = null;
      this.bounds = null;
      //
      this.cam1 = null;
      this.cam2 = null;
      this.cam3 = null;
      this.cam4 = null;
      this.current = null;
    }

    preload() {
      this.load.image('eye', '/assets/pics/lance-overdose-loader-eye.png');
      this.load.image('grid', '/assets/pics/debug-grid-1920x1920.png');
    }

    create() {
      this.add
        .image(0, 0, 'grid')
        .setOrigin(0)
        .setAlpha(0.5);
      //
      this.cam1 = this.cameras.main.setSize(512, 384).setName('Camera 1');
      this.cam2 = this.cameras.add(512, 0, 512, 384).setName('Camera 2');
      this.cam3 = this.cameras.add(0, 384, 512, 384).setName('Camera 3');
      this.cam4 = this.cameras.add(512, 384, 512, 384).setName('Camera 4');
      //
      this.cam2.setScroll(563, 421).setZoom(0.3);
      this.cam3
        .setScroll(702, 811)
        .setZoom(0.6)
        .setRotation(1.03);
      //
      this.current = this.cam1;
      this.current.setBackgroundColor('rgba(0,0,200,0.5)');
      //
      this.graphics = this.add.graphics();
      //
      this.bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1920);
      //
      for (let i = 0; i < 32; i++) {
        let x = Phaser.Math.Between(this.bounds.left, this.bounds.right);
        let y = Phaser.Math.Between(this.bounds.top, this.bounds.bottom);
        //
        let s = this.add.sprite(x, y, 'eye');
        s.setInteractive();
        s.setAngle(Phaser.Math.Between(0, 359));
        s.setScale(0.5 + Math.random());
      }
      //
      this.input.on('gameobjectover', (pointer, gameObject) => {
        gameObject.setTint(0xff0000);
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      this.controls = new Phaser.Cameras.Controls.Smoothed({
        camera: this.cam1,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.005,
        maxSpeed: 1.0
      });
      //
      this.input.keyboard.on(
        'keydown_SPACE',
        event => {
          if (this.current === this.cam1) {
            this.controls.setCamera(this.cam2);
            this.current.setBackgroundColor('#000000');
            this.current = this.cam2;
            this.current.setBackgroundColor('rgba(0,0,200,0.5)');
          } else if (this.current === this.cam2) {
            this.controls.setCamera(this.cam3);
            this.current.setBackgroundColor('#000000');
            this.current = this.cam3;
            this.current.setBackgroundColor('rgba(0,0,200,0.5)');
          } else if (this.current === this.cam3) {
            this.controls.setCamera(this.cam4);
            this.current.setBackgroundColor('#000000');
            this.current = this.cam4;
            this.current.setBackgroundColor('rgba(0,0,200,0.5)');
          } else if (this.current === this.cam4) {
            this.controls.setCamera(this.cam1);
            this.current.setBackgroundColor('#000000');
            this.current = this.cam1;
            this.current.setBackgroundColor('rgba(0,0,200,0.5)');
          }
        },
        this
      );
      //
      this.input.keyboard.on(
        'keydown_Z',
        () => {
          this.controls.camera.rotation += 0.01;
        },
        this
      );
      //
      this.input.keyboard.on(
        'keydown_X',
        () => {
          this.controls.camera.rotation -= 0.01;
        },
        this
      );
      //
      this.gui = new dat.GUI();
      //
      let help = {
        move: 'Cursors',
        zoom: 'Q & E',
        rotate: 'Z & X',
        change: 'Space'
      };
      //
      let p1 = this.gui.addFolder('Pointer');
      p1.add(this.input, 'x').listen();
      p1.add(this.input, 'y').listen();
      p1.add(help, 'move');
      p1.add(help, 'zoom');
      p1.add(help, 'rotate');
      p1.add(help, 'change');
      p1.open();
      //
      let c1 = this.gui.addFolder('Camera 1');
      c1.add(this.cam1, 'x').listen();
      c1.add(this.cam1, 'y').listen();
      c1.add(this.cam1, 'scrollX').listen();
      c1.add(this.cam1, 'scrollY').listen();
      c1
        .add(this.cam1, 'rotation')
        .min(0)
        .step(0.01)
        .listen();
      c1
        .add(this.cam1, 'zoom', 0.1, 2)
        .step(0.1)
        .listen();
      c1.open();
      //
      let c2 = this.gui.addFolder('Camera 2');
      c2.add(this.cam2, 'x').listen();
      c2.add(this.cam2, 'y').listen();
      c2.add(this.cam2, 'scrollX').listen();
      c2.add(this.cam2, 'scrollY').listen();
      c2
        .add(this.cam2, 'rotation')
        .min(0)
        .step(0.01)
        .listen();
      c2
        .add(this.cam2, 'zoom', 0.1, 2)
        .step(0.1)
        .listen();
      c2.open();
      //
      let c3 = this.gui.addFolder('Camera 3');
      c3.add(this.cam3, 'x').listen();
      c3.add(this.cam3, 'y').listen();
      c3.add(this.cam3, 'scrollX').listen();
      c3.add(this.cam3, 'scrollY').listen();
      c3
        .add(this.cam3, 'rotation')
        .min(0)
        .step(0.01)
        .listen();
      c3
        .add(this.cam3, 'zoom', 0.1, 2)
        .step(0.1)
        .listen();
      c3.open();
      //
      let c4 = this.gui.addFolder('Camera 4');
      c4.add(this.cam4, 'x').listen();
      c4.add(this.cam4, 'y').listen();
      c4.add(this.cam4, 'scrollX').listen();
      c4.add(this.cam4, 'scrollY').listen();
      c4
        .add(this.cam4, 'rotation')
        .min(0)
        .step(0.01)
        .listen();
      c4
        .add(this.cam4, 'zoom', 0.1, 2)
        .step(0.1)
        .listen();
      c4.open();
    }

    update(time, delta) {
      this.controls.update(delta);
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x00ff00);
      this.graphics.strokeRectShape(this.bounds);
      this.graphics.lineBetween(0, 0, this.bounds.width, this.bounds.height);
      this.graphics.lineBetween(this.bounds.width, 0, 0, this.bounds.height);
    }

    render() {}
  }
})();

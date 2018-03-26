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
      this.rect1 = null;
      this.rect2 = null;
      this.circle1 = null;
      this.circle2 = null;
      this.triangle1 = null;
      this.px = null;
      this.py = null;
      this.hitShap = null;
    }

    preload() {}

    create() {
      this.graphics = this.add.graphics();
      //
      this.bounds = new Phaser.Geom.Rectangle(0, 0, 1600, 1200);
      this.rect1 = new Phaser.Geom.Rectangle(200, 200, 600, 100);
      this.rect2 = new Phaser.Geom.Rectangle(1010, 800, 60, 300);
      this.circle1 = new Phaser.Geom.Circle(1200, 200, 160);
      this.circle2 = new Phaser.Geom.Circle(400, 900, 80);
      this.triangle1 = new Phaser.Geom.Triangle.BuildEquilateral(800, 500, 200);
      //
      this.drawScene();
      //
      this.input.on('pointermove', (pointer) => {
        let p = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        this.px = p.x;
        this.py = p.y;
        //
        this.hitShap = null;
        //
        if (this.rect1.contains(this.px, this.py)) {
          this.hitShap = this.rect1;
        } else if (this.rect2.contains(this.px, this.py)) {
          this.hitShap = this.rect2;
        } else if (this.circle1.contains(this.px, this.py)) {
          this.hitShap = this.circle1;
        } else if (this.circle2.contains(this.px, this.py)) {
          this.hitShap = this.circle2;
        } else if (this.triangle1.contains(this.px, this.py)) {
          this.hitShap = this.triangle1;
        }
        //
        this.drawScene();

      }, this);
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
      this.input.keyboard.on('keydown_Z', (event) => {
        this.cameras.main.rotation += 0.01;
      }, this);
      //
      this.input.keyboard.on('keydown_X', (event) => {
        this.cameras.main.rotation -= 0.01;
      }, this);
      //
      this.cam = this.cameras.main;
      this.gui = new dat.GUI();
      //
      let p1 = this.gui.addFolder('Pointer');
      p1.add(this.input, 'x').listen();
      p1.add(this.input, 'y').listen();
      p1.open();
      //
      let help = {
        line1: 'Cursors to move',
        line2: 'Q & E to zoom',
        line3: 'Z & X to rotate'
      };
      //
      let f1 = this.gui.addFolder('Camera');
      f1.add(this.cam, 'x').listen();
      f1.add(this.cam, 'y').listen();
      f1.add(this.cam, 'scrollX').listen();
      f1.add(this.cam, 'scrollY').listen();
      f1.add(this.cam, 'rotation').min(0).step(0.01).listen();
      f1.add(this.cam, 'zoom', 0.1, 2).step(0.1).listen();
      f1.add(help, 'line1');
      f1.add(help, 'line2');
      f1.add(help, 'line3');
      f1.open();

    }

    update(time, delta) {
      this.controls.update(delta);
    }

    render() {}

    drawScene() {
      this.graphics.clear();
      // camera marker
      this.graphics.lineStyle(1, 0x00ff00);
      this.graphics.strokeRectShape(this.bounds);
      this.graphics.lineBetween(0, 0, 1600, 1200);
      this.graphics.lineBetween(1600, 0, 0, 1200);
      // shapes
      if (this.hitShap === this.rect1) {
        this.graphics.fillStyle(0xff0000);
        this.graphics.fillRectShape(this.rect1);
      } else {
        this.graphics.fillStyle(0xffff00);
        this.graphics.fillRectShape(this.rect1);
      }
      //
      if (this.hitShap === this.rect2) {
        this.graphics.fillStyle(0xff0000);
        this.graphics.fillRectShape(this.rect2);
      } else {
        this.graphics.fillStyle(0xffff00);
        this.graphics.fillRectShape(this.rect2);
      }
      //
      if (this.hitShap === this.circle1) {
        this.graphics.fillStyle(0xff0000);
        this.graphics.fillCircleShape(this.circle1);
      } else {
        this.graphics.fillStyle(0xffff00);
        this.graphics.fillCircleShape(this.circle1);
      }
      //
      if (this.hitShap === this.circle2) {
        this.graphics.fillStyle(0xff0000);
        this.graphics.fillCircleShape(this.circle2);
      } else {
        this.graphics.fillStyle(0xffff00);
        this.graphics.fillCircleShape(this.circle2);
      }
      //
      if (this.hitShap === this.triangle1) {
        this.graphics.fillStyle(0xff0000);
        this.graphics.fillTriangleShape(this.triangle1);
      } else {
        this.graphics.fillStyle(0xffff00);
        this.graphics.fillTriangleShape(this.triangle1);
      }
    }
  }
})();
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
      this.conv = null;
      this.sprite = null;
      this.matrix = null;
    }

    preload() {
      this.load.image('eye', '/assets/pics/lance-overdose-loader-eye.png');
    }

    create() {
      $('<div/>', { id: 'flow' }).appendTo('body');
      $('#flow').css('display', 'block');
      $('#flow').css('position', 'absolute');
      $('#flow').css('left', '0');
      $('#flow').css('top', 0);
      $('#flow').css('width', '128px');
      $('#flow').css('height', '128px');
      $('#flow').css(
        'background',
        'url(/assets/pics/lance-overdose-loader-eye.png)'
      );
      //
      $('<div/>', { id: 'marker' }).appendTo('body');
      $('#marker').css('display', 'block');
      $('#marker').css('position', 'absolute');
      $('#marker').css('width', '6px');
      $('#marker').css('height', '6px');
      $('#marker').css('backgroundColor', '#ffffff');
      $('#marker').css('border', '1px solid red');
      //
      this.graphics = this.add.graphics();
      //
      this.bounds = new Phaser.Geom.Rectangle(0, 0, 1600, 1200);
      //
      this.sprite = this.add
        .sprite(200, 200, 'eye')
        .setAlpha(1)
        .setOrigin(0)
        .setScrollFactor(2, 0.5)
        // .setScale(2.1, 4.56)
        .setAngle(22)
        .setInteractive();
      //
      this.matrix = new Phaser.GameObjects.Components.TransformMatrix();
      //
      this.input.on('gameobjectover', (pointer, gameObject) => {
        gameObject.setTint(0xff0000);
      });
      //
      this.input.on('gameobjectout', (pointer, gameObject) => {
        gameObject.clearTint();
      });
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
      this.control = new Phaser.Cameras.Controls.Smoothed(controlConfig);
      //
      this.input.keyboard.on(
        'keydown_Z',
        () => {
          this.cameras.main.rotation += 0.01;
        },
        this
      );
      //
      this.input.keyboard.on(
        'keydown_X',
        () => {
          this.cameras.main.rotation -= 0.01;
        },
        this
      );
      //
      this.cam = this.cameras.main;
      //
      this.gui = new dat.GUI();
      this.conv = {
        cx: 0,
        cy: 0,
        px: 0,
        py: 0
      };
      //
      let p1 = this.gui.addFolder('Pointer');
      p1.add(this.input, 'x').listen();
      p1.add(this.input, 'y').listen();
      p1.add(this.conv, 'cx').listen();
      p1.add(this.conv, 'cy').listen();
      p1.add(this.conv, 'px').listen();
      p1.add(this.conv, 'py').listen();
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
      f1
        .add(this.cam, 'rotation')
        .min(0)
        .step(0.01)
        .listen();
      f1
        .add(this.cam, 'zoom', 0.1, 2)
        .step(0.1)
        .listen();
      f1.add(help, 'line1');
      f1.add(help, 'line2');
      f1.add(help, 'line3');
      f1.open();
    }

    update(time, delta) {
      this.control.update(delta);
      //
      let camera = this.cameras.main;
      //
      let p = camera.getWorldPoint(this.input.x, this.input.y);
      this.conv.cx = p.x;
      this.conv.cy = p.y;
      //
      p.x += camera.scrollX * this.sprite.scrollFactorX - camera.scrollX;
      p.y += camera.scrollY * this.sprite.scrollFactorY - camera.scrollY;
      //
      let point = Phaser.Math.TransformXY(
        p.x,
        p.y,
        this.sprite.x,
        this.sprite.y,
        this.sprite.rotation,
        this.sprite.scaleX,
        this.sprite.scaleY
      );
      this.conv.px = point.x;
      this.conv.py = point.y;
      //
      $('#marker').offset({ top: point.y, left: point.x });
      //
      this.graphics.clear();
      //
      this.graphics.lineStyle(1, 0x00ff00);
      this.graphics.strokeRectShape(this.bounds);
      this.graphics.lineBetween(0, 0, 1600, 1200);
      this.graphics.lineBetween(1600, 0, 0, 1200);
      //
      this.graphics.fillStyle(0xff0000);
      this.graphics.fillRect(point.x, point.y, 6, 6);
    }

    render() {}
  }
})();

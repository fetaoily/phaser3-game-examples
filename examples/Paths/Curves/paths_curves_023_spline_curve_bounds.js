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
      this.path = null;
      this.curve = null;
      this.bounds = null;
      this.points = null;
      this.graphics = null;
    }

    preload() {
      this.load.spritesheet('dragcircle', 'assets/sprites/dragcircle.png', {
        frameWidth: 16
      });
    }

    create() {
      this.path = { t: 0, vec: new Phaser.Math.Vector2() };
      //
      this.bounds = new Phaser.Geom.Rectangle();
      //
      this.curve = new Phaser.Curves.Spline([
        20,
        550,
        260,
        450,
        300,
        350,
        550,
        145,
        745,
        256
      ]);
      //
      this.points = this.curve.points;
      // Create drag-handles for each point
      for (let i = 0; i < this.points.length; i++) {
        let point = this.points[i];
        let handle = this.add
          .image(point.x, point.y, 'dragcircle', 0)
          .setInteractive();
        // handle.data.set('vector',point);
        handle.setData('vector', point);
        this.input.setDraggable(handle);
      }
      //
      // this.input.on('DRAG_START_EVENT',(event)=>{
      //   event.gameObject.setFrame(1);
      // });
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setFrame(1);
      });
      //
      // this.input.on('DRAG_EVENT', event => {
      //   event.gameObject.x = event.dragX;
      //   event.gameObject.y = event.dragY;
      //   //
      //   event.gameObject.data.get('vector').set(event.dragX, event.dragY);
      //   //
      //   this.curve.getBounds(this.bounds);
      // });
      //
      this.input.on('drag',(pointer,gameObject,dragX,dragY)=>{
        gameObject.x = dragX;
        gameObject.y = dragY;
        //
        gameObject.data.get('vector').set(dragX,dragY);
        //
        this.curve.getBounds(this.bounds);
      });
      //
      this.tweens.add({
        targets: this.path,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 2000,
        yoyo: true,
        repeat: -1
      });
      //
      this.graphics = this.add.graphics();
    }

    update() {
      this.graphics.clear();
      // Draw the bounds
      this.graphics.lineStyle(1, 0x00ff00, 1).strokeRectShape(this.bounds);
      // Draw the curve through the points
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.curve.draw(this.graphics, 64);
      // Draw t
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.graphics.fillStyle(0xffff00, 1);
      this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);
    }

    render() {}
  }
})();

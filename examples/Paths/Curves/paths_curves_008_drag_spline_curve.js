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
      this.load.spritesheet('dragcircle', 'assets/sprites/dragcircle.png', {frameWidth: 16});
    }

    create () {
      this.path = {t: 0, vec: new Phaser.Math.Vector2()};
      //
      this.curve = new Phaser.Curves.Spline([
        20, 550,
        260, 450,
        300, 250,
        550, 145,
        745, 256,
        100, 100
      ]);
      //
      this.points = this.curve.points;
      for (let i = 0; i < this.points.length; i++) {
        let point = this.points[i];
        let handle = this.add.image(point.x, point.y, 'dragcircle', 0).setInteractive();
        // handle.data.set('vector',point);
        handle.setData('vector', point);
        this.input.setDraggable(handle);
      }
      //
      // this.input.on('DRAG_START_EVENT',(event)=>{
      //   event.gameObject.setFrame(1);
      // });
      this.input.on('dragstart', (pointer, gameObject, dragX, dragY) => {
        gameObject.setFrame(1);
      });
      //
      // this.input.on('DRAG_EVENT', (event) => {
      //   event.gameObject.x = event.dragX;
      //   event.gameObject.y = event.dragY;
      //   //
      //   event.gameObject.data.get('vector').set(event.dragX, event.dragY);
      // });
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        //
        gameObject.data.get('vector').set(dragX, dragY);
      });
      //
      this.input.on('DRAG_END_EVENT', (event) => {
        event.gameObject.setFrame(0);
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

    update () {
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.curve.draw(this.graphics, 64);
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.graphics.fillStyle(0xffff00, 1);
      this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);
    }

    render () {
    }
  }
})();
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
      this.parts = 8;
      this.path = null;
      this.curve = null;
      this.handles = null;
      this.graphics = null;
    }
    preload() {
      this.load.image('ball', 'assets/sprites/shinyball.png');
      this.load.spritesheet('dragcircle', 'assets/sprites/dragcircle.png', {
        frameWidth: 16
      });
    }
    create() {
      this.handles = this.add.group();
      this.ball = this.add.image(0, 0, 'ball').setDepth(1000);
      //
      this.path = { t: 0, vec: new Phaser.Math.Vector2() };
      //
      this.curve = new Phaser.Curves.Spline([new Phaser.Math.Vector2(50, 300)]);
      //
      let tween = this.tweens.add({
        targets: this.path,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 500,
        repeat: -1
      });
      //
      let _this = this;
      let createPointHandle = point => {
        let handle = this.handles
          .create(point.x, point.y, 'dragcircle', 0)
          .setInteractive();
        // handle.data.set('vector', point);
        handle.setData('vector', point);
        _this.input.setDraggable(handle);
      };
      //
      createPointHandle(this.curve.points[0]);
      //
      this.input.on('pointerdown', (pointer, gameObject) => {
        // Check we didn't click an existing handle
        if (gameObject.length > 0) {
          return;
        }
        let vec = this.curve.addPoint(pointer.x, pointer.y);
        createPointHandle(vec);
        //
        this.parts += 8;
        tween.stop();
        //
        this.path.t = 0;
        //
        tween = _this.tweens.add({
          targets: this.path,
          t: 1,
          ease: 'Sine.easeInOut',
          duration: 500 * (this.curve.points.length + 1),
          repeat: -1
        });
      });
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
      // });
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        //
        gameObject.data.get('vector').set(dragX, dragY);
      });
      //
      // this.input.on('EVENT_END_EVENT',(event)=>{
      //   event.gameObject.setFrame(0);
      // });
      //
      this.input.on('dragend', (pointer, gameObject) => {
        gameObject.setFrame(0);
      });
      //
      this.graphics = this.add.graphics();
    }
    update() {
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xffffff, 1);
      //
      this.curve.draw(this.graphics, this.parts);
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.ball.setPosition(this.path.vec.x, this.path.vec.y);
    }
    render() {}
  }
})();

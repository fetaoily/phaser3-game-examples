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
      this.path = null;
      this.curve = null;
      this.text = null;
      this.graphics = null;
    }

    preload () {
      this.load.spritesheet('dragcircle', 'assets/sprites/dragcircle.png', {frameWidth: 16});
    }

    create () {
      let sliderGraphics = this.add.graphics();
      //
      this.path = {t: 0, vec: new Phaser.Math.Vector2()};
      //
      this.curve = new Phaser.Curves.Ellipse(400, 300, 100, 150);
      //
      this.createSlider(sliderGraphics, 100, 10, 'width', 500, 0, 400, 100, this.curve.setXRadius);
      this.createSlider(sliderGraphics, 100, 30, 'height', 500, 0, 300, 150, this.curve.setYRadius);
      this.createSlider(sliderGraphics, 100, 50, 'start', 500, 0, 360, 0, this.curve.setStartAngle);
      this.createSlider(sliderGraphics, 100, 70, 'end', 500, 0, 360, 360, this.curve.setEndAngle);
      this.createSlider(sliderGraphics, 100, 90, 'angle', 500, 0, 360, 0, this.curve.setRotation);
      //
      let centerPoint = this.add.image(this.curve.p0.x, this.curve.p0.y, 'dragcircle', 0).setInteractive();
      centerPoint.setData('control', 'center').setData('vector', this.curve.p0);
      //
      this.input.setDraggable(centerPoint);
      //
      // this.input.on('DRAG_START_EVENT', (event) => {
      //   console.info(event);
      //   event.gameObject.setFrame(1);
      // });
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setFrame(1);
      });
      //
      // this.input.on('DRAG_EVENT', (event) => {
      //   console.info(event);
      //   let gameObject = event.gameObject;
      //   //
      //   if (gameObject.data.get('control') === 'center') {
      //     gameObject.x = event.dragX;
      //     gameObject.y = event.dragY;
      //     //
      //     gameObject.data.get('vector').set(event.dragX, event.dragY);
      //   }
      // });
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        if (gameObject.data.get('control') === 'center') {
          gameObject.x = dragX;
          gameObject.y = dragY;
          //
          gameObject.data.get('vector').set(dragX, dragY);
        }
      });
      //
      // this.input.on('DRAG_END_EVENT', (event) => {
      //   console.info(event);
      //   event.gameObject.setFrame(0);
      // });
      //
      this.input.on('dragend', (pointer, gameObject) => {
        gameObject.setFrame(0);
      });
      //
      this.tweens.add({
        targets: this.path,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        repeat: -1
      });


      // Debug graphics
      this.graphics = this.add.graphics();
    }

    update () {
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xffffff, 1);
      this.curve.draw(this.graphics, 64);
      this.curve.getPoint(this.path.t, this.path.vec);
      //
      this.graphics.fillStyle(0xffff00, 1);
      this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);
    }

    render () {
    }

    createSlider (graphics, x, y, label, width, min, max, value, callback) {
      // Default value
      value = Phaser.Math.Clamp(value, min, max);
      //
      graphics.lineStyle(1, 0xffffff, 1);
      graphics.lineBetween(x, y + 8, x + width, y + 8);
      //
      let text = this.add.text(x - 10, label + ':', {font: '16px Courier', fill: '#00ff00'}).setOrigin(1, 0);
      let textValue = this.add.text(x + width + 10, y, value.toFixed(2), {font: '16px Courier', fill: '#00ff00'});
      //
      let image = this.add.image(x, y + 8, 'dragcircle', 0).setInteractive();
      //
      image.setData('labelValue', textValue);
      image.setData('left', 0);
      image.setData('right', x + width);
      //
      this.input.setDraggable(image);
      // Drag limits
      image.setData('label', label);
      // The range the control is allowed to be within (the actual values, not the percentage or pixels)
      image.setData('min', min);
      image.setData('max', max);
      image.setData('value', value);
      // The scale is how many pixels = 1 unit of range
      let scale = max / width;
      //
      image.setData('scale', scale);
      //
      let p = Phaser.Math.Percent(value, min, max);
      //
      image.x += p * width;
      image.setData('callback', callback);
      //
      // this.input.setOnDragCallback(image, this.updateSlider, this);
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        if (gameObject === image) {
          this.updateSlider(image, pointer, dragX, dragY);
        }
      });
    }

    updateSlider (handle, pointer, dragX, dragY) {
      let min = handle.getData('min');
      let max = handle.getData('max');
      let scale = handle.getData('scale');
      let left = handle.getData('left');
      let right = handle.getData('right');
      //
      handle.x = dragX;
      // Calculate the value
      let value = (dragX - left) * scale;
      //
      handle.setData('value', value);
      handle.getData('labelValue').setText(value.toFixed(2));
      //
      let callback = handle.getData('callback');
      callback.call(this.curve, value);
    }
  }
})();
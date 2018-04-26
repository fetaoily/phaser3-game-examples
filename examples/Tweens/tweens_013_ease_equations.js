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
      this.load.image('bar', 'assets/sprites/bluebar.png');
    }

    create () {
      // There are 32 built-in easing equations including Elastic which is shown in the Elasticity example
      let ease = [
        'Linear',
        'Quad.easeIn',
        'Cubic.easeIn',
        'Quart.easeIn',
        'Quint.easeIn',
        'Sine.easeIn',
        'Expo.easeIn',
        'Circ.easeIn',
        'Back.easeIn',
        'Bounce.easeIn',
        'Quad.easeOut',
        'Cubic.easeOut',
        'Quart.easeOut',
        'Quint.easeOut',
        'Sine.easeOut',
        'Expo.easeOut',
        'Circ.easeOut',
        'Back.easeOut',
        'Bounce.easeOut',
        'Quad.easeInOut',
        'Cubic.easeInOut',
        'Quart.easeInOut',
        'Quint.easeInOut',
        'Sine.easeInOut',
        'Expo.easeInOut',
        'Circ.easeInOut',
        'Back.easeInOut',
        'Bounce.easeInOut'
      ];
      //
      let markers = this.add.group({
        key: 'bar',
        repeat: 27,
        setXY: {
          x: 96, y: 32, stepY: 19
        },
        setAlpha: {value: 0.3}
      });
      //
      let images = this.add.group({
        key: 'bar',
        repeat: 27,
        setXY: {
          x: 96,
          y: 32,
          stepY: 19
        }
      });
      //
      let _this = this;
      images.children.iterate((child) => {
        _this.tweens.add({
          targets: child,
          x: 700,
          ease: ease.shift(),
          duration: 1500,
          delay: 1000,
          repeat: -1,
          repeatDelay: 1000,
          hold: 1000
        });
      });
    }

    update () {
    }
  }
})();
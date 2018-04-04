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
      this.load.spritesheet('balls', 'assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17});
    }

    create () {
      let graphics = this.add.graphics();
      let color = 0xffff00;
      let thickness = 2;
      let alpha = 1;
      // Events
      let sx = 0;
      let sy = 0;
      let draw = false;
      // Stop the right-click from triggering the context menu
      // You can also set this in the game config
      this.input.mouse.disableContextMenu();
      //
      this.input.on('pointerdown', (pointer) => {
        sx = pointer.x;
        sy = pointer.y;
        draw = true;
        //
        if (pointer.leftButtonDown() && pointer.rightButtonDown()) {
          color = 0x00ffff;
        } else if (pointer.leftButtonDown()) {
          color = 0xffff00;
        } else if (pointer.rightButtonDown()) {
          color = 0x00ff00;
        }
      });
      //
      this.input.on('pointerup', () => {
        draw = false;
      });
      //
      this.input.on('pointermove', (pointer) => {
        if (draw && pointer.noButtonDown() === false) {
          graphics.clear();
          graphics.lineStyle(thickness, color, alpha);
          graphics.strokeRect(sx, sy, pointer.x - sx, pointer.y - sy);
        }
      });

    }

    update () {
    }

    render () {
    }
  }
})();
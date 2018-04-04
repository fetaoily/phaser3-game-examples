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
    }

    create () {
      let graphics = this.add.graphics();
      let color = 0xffff00;
      let thickness = 2;
      let alpha = 1;
      // Events
      let draw = false;
      //
      this.input.on('pointerdown', (pointer) => {
        draw = true;
      });
      this.input.on('pointerup', (pointer) => {
        draw = false;
      });
      this.input.on('pointermove', (pointer) => {
        if (draw) {
          graphics.clear();
          graphics.lineStyle(thickness, color, alpha);
          graphics.strokeRect(pointer.downX, pointer.downY, pointer.x - pointer.downX, pointer.y - pointer.downY);
        }
      });
    }

    update () {
    }

    render () {
    }
  }
})();
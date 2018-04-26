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
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      let image = this.add.image(100, 300, 'ball');
      let destX = 700;
      //
      let tween = this.tweens.add({
        targets: image,
        duration: 500,
        yoyo: true,
        repeat: 8,
        ease: 'Sine.easeInOut',
        x: {
          getEnd (target, key, value) {
            destX -= 30;
            return destX;
          },
          getStart (target, key, value) {
            return value + 30;
          }
        }
      })
    }

    update () {
    }
  }
})();
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
      let image = this.add.image(100, 100, 'ball');
      let destX = 700;
      // TODO Cache the start and end values so that on a Tween LOOP (not a TweenData repeat) it can reset them:)
      let tween = this.tweens.add({
        targets: image,
        props: {
          y: {
            value: 500,
            duration: 8000,
            ease: 'Power1'
          },
          x: {
            duration: 400,
            yoyo: true,
            repeat: 8,
            ease: 'Sine.easeInOut',
            value: {
              getEnd (target, key, value) {
                destX -= 30;
                return destX;
              },
              getStart (target, key, value) {
                return value + 30;
              }
            }
          }

        }
      })
    }

    update () {
    }
  }
})();
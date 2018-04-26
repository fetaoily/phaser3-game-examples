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
      this.load.image('cursor', 'assets/sprites/drawcursor.png');
    }

    create () {
      let from = this.add.image(400, 300, 'ball').setAlpha(0.6);
      let marker = this.add.image(400, 300, 'cursor').setAlpha(0.6);
      let image = this.add.image(400, 300, 'ball');
      //
      this.input.on('pointerdown', (pointer) => {
        marker.setPosition(pointer.x, pointer.y);
      });
      //
      let tween = this.tweens.add({
        targets: image,
        props: {
          x: {
            ease: 'Power1',
            value () {
              return marker.x;
            }
          },
          y: {
            ease: 'Power3',
            value () {
              return marker.y;
            }
          }
        },
        duration: 500,
        yoyo: true,
        repeat: -1
      });
    }

    update () {
    }
  }
})();
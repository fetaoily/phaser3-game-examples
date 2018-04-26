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
      this.load.image('block', 'assets/sprites/checkerboard.png');
    }

    create () {
      let blocks = this.add.group({key: 'block', repeat: 107});
      //
      Phaser.Actions.GridAlign(blocks.getChildren(), {
        width: 12,
        height: 9,
        cellWidth: 64,
        cellHeight: 64,
        x: 32,
        y: 32
      });
      //
      let a = [0, 90, 180, 270];
      blocks.children.iterate((child) => {
        child.angle = Phaser.Math.RND.pick(a);
        //
        this.tweens.add({
          targets: child,
          ease: 'Power1',
          duration: 250,
          delay: (Math.random() * 6000),
          repeatDelay: 3000 + (Math.random() * 6000),
          repeat: -1,
          angle: {
            getEnd (target, key, value) {
              let a = 90;
              if (Math.random() > 0.5) {
                a = 180;
              }
              if (Math.random() > 0.5) {
                return target.angle + a;
              } else {
                return target.angle - a;
              }
            },
            getStart (target, key, value) {
              return target.angle;
            }
          }
        })
      }, this);
    }

    update () {
    }
  }
})();
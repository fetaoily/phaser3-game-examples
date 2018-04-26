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
      this.load.image('bg', 'assets/pics/skull-and-bones.jpg');
      this.load.image('block', 'assets/sprites/50x50-black.png');
    }

    create () {
      this.add.image(400, 300, 'bg');
      //
      let blocks = this.add.group({key: 'block', repeat: 191});
      //
      Phaser.Actions.GridAlign(blocks.getChildren(), {
        width: 16,
        cellWidth: 50,
        cellHeight: 50,
        x: 25,
        y: 25
      });
      //
      let _this = this;
      let i = 0;
      //
      blocks.children.iterate((child) => {
        _this.tweens.add({
          targets: child,
          scaleX: 0,
          scaleY: 0,
          alpha: 0,
          y: '+=64',
          angle: 180,
          ease: 'Power3',
          duration: 1000,
          delay: 1000 + (i * 100)
        });
        //
        i++;
        // Change the value 32 for different results
        if (i % 16 === 0) {
          i = 0;
        }
      });
    }

    update () {
    }
  }
})();
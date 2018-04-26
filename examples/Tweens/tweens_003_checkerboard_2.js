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
      this.load.image('block', 'assets/sprites/50x50.png');
    }

    create () {
      let blocks = this.add.group({key: 'block', repeat: 107, setScale: {x: 0.3, y: 0.3}});
      //
      Phaser.Actions.GridAlign(blocks.getChildren(), {
        width: 12,
        height: 10,
        cellWidth: 60,
        cellHeight: 60,
        x: 70, y: 60
      });
      //
      let _this = this;
      let i = 0;
      //
      blocks.children.iterate((child) => {
        _this.tweens.add({
          targets: child,
          scaleX: 1,
          scaleY: 1,
          ease: 'Sine.easeInOut',
          duration: 300,
          delay: i * 50,
          repeat: -1,
          yoyo: true,
          repeatDelay: 500
        });
        //
        i++;
        //
        if (i % 12 === 0) {
          i = 0;
        }
      });
    }

    update () {
    }
  }
})();
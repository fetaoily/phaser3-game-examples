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
      let blocks = this.add.group({key: 'block', repeat: 139, setScale: {x: 0, y: 0}});
      Phaser.Actions.GridAlign(blocks.getChildren(), {
        width: 14,
        cellWidth: 50,
        cellHeight: 50,
        x: 70,
        y: 60
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
          angle: 180,
          _ease: 'Sine.easeInOut',
          ease: 'Power2',
          duration: 1000,
          delay: i * 50,
          repeat: -1,
          yoyo: true,
          hold: 1000,
          repeatDelay: 1000
        });
        //
        i++;
        //
        if (i % 14 === 0) {
          i = 0;
        }
      });

    }

    render () {
    }
  }
})();
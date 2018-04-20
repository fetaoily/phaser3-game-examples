(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          setBounds: {
            x: 100,
            y: 100,
            width: 600,
            height: 400
          }
        }
      },
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
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let block = this.block = this.impact.add.image(200, 200, 'block');
      block.setActive();
      block.setBounce(10);
      block.setVelocityX(100);
      block.setVelocityY(100);
      //
      this.tweens.add({
        targets: block,
        angle: 100,
        alpha: 0.1,
        scaleX: 3,
        scaleY: 3,
        duration: 2000,
        yoyo: true,
        repeat: -1
      });
    }

    update () {
    }

    render () {
    }
  }
})();
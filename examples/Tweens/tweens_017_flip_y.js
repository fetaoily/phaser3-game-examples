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
      this.load.image('cokecan', 'assets/sprites/cokecan.png');
    }

    create () {
      let marker = this.add.image(100, 100, 'cokecan').setAlpha(0.3);
      let image = this.add.image(100, 100, 'cokecan');
      // flipY will can toggleFlipy on the image whenever it yoyos or repeats
      let tween = this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        flipY: true,
        yoyo: true,
        repeat: -1
      });
    }

    update () {
    }
  }

})();
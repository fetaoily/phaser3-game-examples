(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    gameConfig = this.gameConfig = {
      scene: [PlayGame]
    };
    game = this.game = new NewGame(this.gameConfig);
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
      let image = this.add.image(400, 500, 'block');
      let tween = this.tweens.add({
        targets: image,
        y: '-=64',
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: 6
      });
      console.info(tween);
    }

    update () {
    }
  }
})();
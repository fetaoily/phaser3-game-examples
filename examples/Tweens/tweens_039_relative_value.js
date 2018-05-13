(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    gameConfig = this.gameConfig = {
      scene: [PlayGame]
    };
    game = this.gameConfig = new NewGame(this.gameConfig);
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
      let image = this.add.image(100, 100, 'block');
      let tween = this.tweens.add({
        targets: image,
        props: {
          x: { value: '+=500', duration: 3000, ease: 'Power2' },
          y: { value: '+=300', duration: 1500, ease: 'Bounce.easeOut' }
        },
        delay: 1000
      });
      console.log(tween);
    }

    update () {
    }
  }
})();
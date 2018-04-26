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
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let image1 = this.add.image(130, 50, 'block');
      let image2 = this.add.image(190, 80, 'block');
      let image3 = this.add.image(50, 150, 'block');
      //
      this.tweens.add({
        targets: [image1, image2, image3],
        props: {
          x: {value: '+=600', duration: 3000, ease: 'Power2'},
          y: {value: '500', duration: 1500, ease: 'Bounce.easeOut'}
        },
        delay: 1000
      });
    }

    update () {
    }
  }
})();
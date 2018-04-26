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
      let image1 = this.add.image(50, 100, 'block');
      let image2 = this.add.image(60, 200, 'block');
      let image3 = this.add.image(70, 300, 'block');
      //
      let tween = this.tweens.add({
        targets: [image1, image2, image3],
        x: '+=600',
        y: '+=200',
        duration: 4000,
        ease: 'Power3'
      });
      console.info(tween);
    }

    update () {
    }
  }
})();
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
      let marker = this.add.image(100, 300, 'block').setAlpha(0.3);
      let image = this.add.image(100, 300, 'block');
      //
      this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        onComplete: this.onCompleteHandler,
        onCompleteParams: [image]
      })
    }

    update () {
    }

    // The callback is always sent a  reference to the Tween as the first argument and the targets as the second.
    // Whatever you provided in the onCompleteParams array follows.
    onCompleteHandler (tween, targets, myImage) {
      console.log('onCompleteHandler');
      myImage.setScale(2);
    }
  }
})();
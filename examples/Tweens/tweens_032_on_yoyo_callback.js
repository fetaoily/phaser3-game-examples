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
      this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create () {
      let marker = this.add.image(100, 100, 'arrow').setAlpha(0.3);
      let image = this.add.image(100, 100, 'arrow');
      //
      let tween = this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Poser1',
        duration: 3000,
        yoyo: true,
        repeat: -1,
        onStart () {
          console.log('onStart');
          console.log(arguments);
        },
        onComplete () {
          console.log('onComplete');
          console.log(arguments);
        },
        // onYoyo () {
        //   console.log('onYoyo');
        //   console.log(arguments);
        // },
        onYoyo: this.onYoyoHandler,
        onRepeat () {
          console.log('onRepeat');
          console.log(arguments);
        }
      })
    }

    update () {
    }

    // The callback is always sent a reference to the Tween as the first argument and the targets as the second,
    // the whatever you provided in the onStartParams array as the rest
    onYoyoHandler (twee, target) {
      console.log(arguments);
      target.toggleFlipX().setAlpha(0.2 + Math.random());
    }
  }
})();
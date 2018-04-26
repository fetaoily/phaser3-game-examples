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
        ease: 'Power1',
        duration: 3000,
        yoyo: true,
        repeat: 1,
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

    onYoyoHandler (tween, target) {
      console.info(arguments);
      target.toggleFlipX().setAlpha(0.2 + Math.random());
    }
  }
})();
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
      super()
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let image = this.add.image(0, 400, 'block');
      //
      let tween = this.tweens.add({
        targets: image,
        props: {
          x: {value: 800, duration: 5000, ease: 'Linear'},
          y: {value: 100, duration: 1000, ease: 'Bounce.easeInOut', yoyo: true, delay: 1000}
        }
      });
      //
      console.log(tween);
    }

    update () {
    }
  }
})();
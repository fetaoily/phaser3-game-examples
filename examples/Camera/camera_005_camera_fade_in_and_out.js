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
      this.load.image('robota', 'assets/pics/robota-uxo-by-made-of-bomb.jpg');
    }

    create () {
      this.image = this.add.image(900, 300, 'robota');
      //
      this.tweens.add({
        targets: this.image,
        x: 100,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        duration: 3000
      });
      //
      this.cameras.main.fadeIn(6000, this.runFadeOut);
    }

    update () {
    }

    render () {
    }

    runFadeOut (camera) {
      camera.fadeOut(6000);
    }
  }
})();
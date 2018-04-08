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
      this.camera = null;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
    }

    create () {
      let image = this.add.image(0, 0, 'CherilPerils');
      //
      this.cameras.main.setViewport(5, 5, 390, 290);
      //
      this.camera = this.cameras.add(5, 5, 390, 290);
      //
      this.camera.flash(1000, 1.0, 1.0, 1.0, false, () => {
        this.flashComplete();
      });
    }

    update () {
    }

    render () {
    }

    flashComplete () {
      console.info('Flash completed. Starting shake effect.');
      this.camera.shake(1000, 0.05, false, () => {
        this.shakeComplete();
      });
    }

    shakeComplete () {
      console.info('Shake completed. Staring fade effect.');
      this.camera.fade(1000, 0, 0, 0, false, () => {
        this.fadeComplete();
      });
    }

    fadeComplete () {
      console.info('Fade complete. End of example.');
    }
  }
})();
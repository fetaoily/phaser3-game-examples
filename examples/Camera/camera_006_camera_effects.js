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
      this.fadeCamera = null;
      this.flashCamera = null;
      this.shakeCamera = null;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'CherilPerils');
      //
      this.cameras.main.setViewport(5, 5, 390, 290);
      //
      this.fadeCamera = this.cameras.add(405, 5, 390, 290);
      this.flashCamera = this.cameras.add(5, 305, 390, 290);
      this.shakeCamera = this.cameras.add(405, 305, 390, 290);
      //
      this.fadeCamera.fade(1000);
    }

    update () {
      this.flashCamera.flash(1000);
      this.shakeCamera.shake(1000);
      //
      if (this.fadeCamera._fadeAlpha >= 1.0) {
        this.fadeCamera._fadeAlpha = 0.0;
        this.fadeCamera.fade(1000);
      }
    }

    render () {
    }
  }
})();
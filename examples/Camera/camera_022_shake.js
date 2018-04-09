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
      this.shakeTime = 0;
    }

    preload () {
      this.load.image('pic', 'assets/pics/a-new-link-to-the-past-by-ptimm.jpg');
    }

    create () {
      this.add.image(400, 300, 'pic');
      this.input.on('pointerdown', (pointer) => {
        this.shakeTime = 500;
      });
    }

    update (time, delta) {
      if (this.shakeTime > 0) {
        this.shakeTime -= delta;
        this.cameras.main.shake(500);
      }
    }

    render () {
    }
  }
})();
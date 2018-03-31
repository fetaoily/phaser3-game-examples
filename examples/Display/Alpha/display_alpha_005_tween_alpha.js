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
      this.load.image('turkey', 'assets/pics/turkey-1985086.jpg');
      this.load.image('face', 'assets/pics/bw-face.png');
    }

    create () {
      let face = this.add.image(400, 300, 'face');
      let sea = this.add.image(400, 300, 'turkey').setAlpha(0);
      //
      this.tweens.add({
        targets: sea,
        alphaTopLeft: {value: 1, duration: 5000, ease: 'Power1',},
        alphaBottomRight: {value: 1, duration: 10000, ease: 'Power1',},
        alphaBottomLeft: {value: 1, duration: 5000, ease: 'Power1', delay: 5000},
        yoyo: true,
        loop: -1
      });
    }

    update () {
    }

    render () {
    }
  }
})();
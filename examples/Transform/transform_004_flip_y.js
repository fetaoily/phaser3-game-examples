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
      this.load.image('pic', 'assets/pics/cougar-face-of-nature.png');
    }

    create () {
      // Default non-flipped image
      this.add.image(250, 164, 'pic');
      // Flipped via a call to setFlipX
      this.add.image(250, 464, 'pic').setFlipY(true);
      //
      let image1 = this.add.image(650, 164, 'pic');
      // Flipped via setting the flipY property
      image1.flipY = true;
      //
      let image2 = this.add.image(650, 464, 'pic');
      //
      this.input.on('pointerdown', () => {
        // Flipped via a call to toggleFlipY
        image2.toggleFlipY();
      });
    }

    update () {
    }
  }
})();
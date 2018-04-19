(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {default: 'impact'},
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
      this.load.bitmapFont('hyper', 'assets/fonts/bitmap/hyperdrive.png', 'assets/fonts/bitmap/hyperdrive.xml');
    }

    create () {
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create as Bitmap Text Object
      let text = this.add.bitmapText(0, 0, 'hyper', 'Phaser 2', 96);
      // If you don't set the body as active it won't collide with the world bounds
      // Set the Game Object we just created as being bound to this physics body
      this.impact.add.body(100, 200).setGameObject(text).setActive().setVelocity(300, 200).setBounce(1);
    }

    update () {
    }

    render () {
    }
  }
})();
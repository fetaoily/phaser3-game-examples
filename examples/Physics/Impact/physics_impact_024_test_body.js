(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          gravity: 100,
          maxVelocity: 500
        }
      },
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
    }

    create () {
      // Colling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create a Text object
      let text = this.add.text(0, 0, 'Phaser 3', {font: '64px Arial', fill: '#00ff00'});
      // If you don't set the body as active it won't collide with the world bounds
      // Set the Game Object we just created as being bound to this physics body
      // this.impact.add.body(300, 300).setGameObject(text).setActive().setVelocity(300, 200).setBounce(1);
      this.impact.add.body(300, 300).setGameObject(text).setActive().setVelocity(300, 200).setBounce(1);
    }

    update () {
    }

    render () {
    }
  }
})();
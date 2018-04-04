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
    }

    create () {
      // They get 1 second to press the next key in the combo, or it resets
      let combo = this.input.keyboard.createCombo('phaser', {makKeyDelay: 1000});
      //
      this.input.keyboard.on('keycombomatch', (event) => {
        console.log('You typed phaser quickly!');
      });
    }

    update () {
    }

    render () {
    }
  }
})();
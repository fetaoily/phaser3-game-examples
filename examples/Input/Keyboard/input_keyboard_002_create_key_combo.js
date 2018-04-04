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
      let combo = this.input.keyboard.createCombo('ABCD');
      this.input.keyboard.on('keycombomatch', (event) => {
        console.log(event);
        console.log('Key Combo matched!');
      });
    }

    update () {
    }

    render () {
    }
  }
})();
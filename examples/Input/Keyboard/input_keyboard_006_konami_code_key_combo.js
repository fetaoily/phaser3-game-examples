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
      // 37 = LEFT
      // 38 = UP
      // 39 = RIGHT
      // 40 = DOWN
      let combo = this.input.keyboard.createCombo([38, 38, 38, 40, 40, 40, 37, 37, 37, 39, 39, 39], {resetOnMatch: true});
      //
      this.input.keyboard.on('keycombomatch', (event) => {
        console.log('Konami Code entered!');
      });
    }

    update () {
    }

    render () {
    }
  }
})();
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
      // Listen for a specific key (in this case the A key.)
      // This works without creating a new Key object, and is especially useful for 'once' calls.
      // For game input (i.e. player controls) you should use Key objects instead.
      this.input.keyboard.on('down_A', (event) => {
        console.log('Hello from the A Key!');
      });
      this.input.keyboard.on('keydown', (event) => {
        console.log('key:' + event.key);
        console.log('event', event);
      });
      this.input.keyboard.on('down_space', (event) => {
        console.log('Hello from the Space Bar!');
      });
    }

    update () {
    }

    render () {
    }
  }
})();
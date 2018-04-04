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
      // Here we'll create a simple key combo
      // When you type in ABC the event will be triggered on the entry of the final character(c)
      // An incorrect key press will reset the combo back to the start again
      // The extra config option allows you to trigger this combo as many times as you like, by typing ABC ABC ABC repeatedly
      let combo = this.input.keyboard.createCombo('ABC', {resetOnMatch: true});
      this.input.keyboard.on('keycombomatch', (event) => {
        console.log('Key Combo matched!');
      });
    }

    update () {
    }

    render () {
    }
  }
})();
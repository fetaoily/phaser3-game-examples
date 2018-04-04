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
      // Global event listener, catches all keys
      // Receive every single key down event, regardless of type
      this.input.keyboard.on('keydown', (event) => {
        console.dir(event);
      });
      // Hook to a specific key without creating a new Key object (in this case the A key)
      this.input.keyboard.on('keydown_A', (event) => {
        console.log('Hello from the A key!');
      });
      // Fire on once on a specific key up event (in this case the S key)
      this.input.keyboard.on('keyup_S', (event) => {
        console.log('Keyboard Events Stopped');
        this.input.keyboard.stopListeners();
      }, this);
      // Create a Key object we can poll directly in a tight loop
      this.BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }

    update () {
      if (this.BKey.isDown) {
        console.log('B!');
      }
    }

    render () {
    }
  }
})();
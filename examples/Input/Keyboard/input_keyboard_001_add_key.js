(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {scene: [PlayGame]};
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
      this.load.image('keyboard', 'assets/input/keyboard-opreem.png');
      this.load.image('highlight', 'assets/input/key1.png');
    }

    create () {
      this.drawKeyboard();
      // Create a Key object we can poll directly.
      // This is especially useful if you need to poll the key in a tight loop, such as for player controls.
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      //
      // let row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Minus', 'Plus', 'Backspace_Alt'];
      // let x = 100;
      // let y = 100;
      // let spacing = 106;
      // for (let i = 0; i < row.length; i++) {
      //   let key = row[i];
      //   this.add.image(x, y, 'keyboard', key);
      //   x += spacing;
      // }
    }

    update () {
      if (this.keyA.isDown) {
        console.log('A');
      }
      if (this.key5.isDown) {
        console.log('5');
      }
      if (this.keySpace.isDown) {
        console.log('spacebar');
      }
    }

    render () {
    }

    drawKeyboard () {
      this.add.image(0, 0, 'keyboard').setOrigin(0);
      //
      this.highlight1 = this.add.image(108, 112, 'highlight').setOrigin(0);
    }
  }
})();
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
      this.text = null;
      this.tween = null;
    }

    preload () {
    }

    create () {
      this.text = this.add.text(30, 20, '0', {font: '48px Courier', fill: '#00ff00'});

      //  A 'Counter' tween is a special type of tween which doesn't have a target.
      //  Instead it allows you to tween between 2 numeric values. The default values
      //  are 0 to 1, but can be set to anything. You can use the tweened value via
      //  `tween.getValue()` for the duration of the tween.

      this.tween = this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000
      });
    }

    update () {
      this.text.setText([
        'Value: ' + this.tween.getValue().toFixed(6),
        'Progress: ' + this.tween.totalProgress.toFixed(6),
        'Elapsed: ' + this.tween.totalElapsed.toFixed(6),
        'Duration: ' + this.tween.totalDuration.toFixed(6)
      ]);
    }
  }
})();
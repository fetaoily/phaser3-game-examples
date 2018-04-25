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
      this.timeText = this.add.text(100, 200);
    }

    update (time, delta) {
      this.timeText.setText([
        'Time: ' + time,
        'Delta: ' + delta
      ]);
    }
  }
})();
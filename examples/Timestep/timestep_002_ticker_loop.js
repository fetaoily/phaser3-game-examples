(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      useTicker: true,
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
      this.image = null;
      this.time = null;
      this.delta = null;
      this.log = null;
      //  600px in 20 seconds
      //  600 / 20 = 30px per second
      //  30 / 1000 = 0.03px per ms
      this.speed = (600 / 2) / 1000;
    }

    preload () {
      this.load.image('bunny', 'assets/sprites/bunny.png');
    }

    create () {
      this.delta = this.add.text(0, 0);
      //
      this.image = this.add.image(0, 200, 'bunny');
      //
      this.time = this.add.text(400, 400);
      //
      this.log = [];
    }

    update (dt) {
      this.image.x += this.speed * (dt * 1000);
      //
      if (this.image.x > 100) {
        this.image.x = 0;
      }
      //
      this.log.push(this.sys.game.loop.delta.toString());
      //
      if (this.log.length > 30) {
        this.log.shift();
      }
      //
      this.time.setText('time: ' + this.sys.game.loop.time.toString());
      //
      this.delta.setText(this.log);
    }
  }
})();
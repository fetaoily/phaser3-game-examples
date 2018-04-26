(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      backgroundColor: '#9adaea',
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
      this.bullet1 = null;
      this.bullet2 = null;
      this.bullet3 = null;
    }

    preload () {
      this.load.image('bullet', 'assets/tests/timer/bullet-bill.png');
      this.load.image('cannon', 'assets/tests/timer/cannon.png');
      this.load.image('ground', 'assets/tests/timer/ground.png');
    }

    create () {
      // Bullet 1 (600px in 6 seconds)
      this.add.image(0, 200, 'ground').setOrigin(0);
      //
      this.bullet1 = this.add.image(64, 76, 'bullet').setOrigin(0);
      //
      this.speed1 = Phaser.Math.GetSpeed(600, 6);
      //
      this.add.image(64, 72, 'cannon').setOrigin(0);
      //
      this.add.text(64, 50, '600px / 6 secs', {fill: '#000'});
      // Bullet 2 (600px in 3 seconds)
      this.add.image(0, 500, 'ground').setOrigin(0);
      //
      this.bullet2 = this.add.image(64, 376, 'bullet').setOrigin(0);
      //
      this.speed2 = Phaser.Math.GetSpeed(600, 3);
      //
      this.add.image(64, 500, 'cannon').setOrigin(0, 1);
      //
      this.add.text(64, 350, '600px / 3 secs', {fill: '#0000'});
    }

    // The update function is passed 2 values:
    // The current time ( in ms )
    // And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied
    update (time, delta) {
      //
      this.bullet1.x += this.speed1 * delta;
      //
      if (this.bullet1.x > 864) {
        this.bullet1.x = 64;
      }
      //
      this.bullet2.x += this.speed2 * delta;
      //
      if (this.bullet2.x > 864) {
        this.bullet2.x = 64;
      }
    }
  }
})();
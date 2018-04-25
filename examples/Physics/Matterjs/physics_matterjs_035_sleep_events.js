(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true
        }
      },
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
      this.load.image('ball', 'assets/sprites/pangball.png');
    }

    create () {
      this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
      //
      this.time.addEvent({
        delay: 500,
        callback: () => {
          let ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball');
          ball.setCircle();
          ball.setFriction(0.005).setBounce(1);
          ball.setSleepEvents(true, true);
        },
        callbackScope: this,
        repeat: 64
      });
      //
      this.matter.world.on('SLEEP_START_EVENT', (event) => {
        event.body.gameObject.setTint(0xff0000);
      });
      //
      this.matter.world.on('SLEEP_END_EVENT', (event) => {
        event.body.gameObject.setTint(0xffffff);
      });
    }

    update () {
    }
  }
})();
(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          setBounds: {
            x: 0, y: 0,
            width: 800, height: 600,
            thickness: 64
          },
          enableSleeping: true
        }
      },
      scene: [SceneA]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class SceneA extends ErtaoGameScene {
    constructor () {
      super({
        key: 'sceneA'
      });
    }

    preload () {
      console.log('%c SceneA - preload', 'background: green;color: white; display: block;');
      //
      this.load.image('ball1', 'assets/sprites/pangball.png');
    }

    create () {
      console.log('%c SceneA - create', 'background: green;color: white; display: block;');
      //
      this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
      for (let i = 0; i < 64; i++) {
        let ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball1');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
      }
      //
      this.input.once('pointerdown', (event) => {
        this.scene.restart();
      }, this);
    }
  }


})();
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
      scene: [SceneA, SceneB]
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
      this.load.image('ball1', 'assets/sprites/pangball.png');
    }

    create () {
      this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
      //
      for (let i = 0; i < 64; i++) {
        let ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 1), 'ball1');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
      }
      //
      this.input.once('pointerdown', (event) => {
        this.scene.transition({
          target: 'sceneB', duration: 2000
        });
      }, this);
    }

    update () {
    }
  }

  class SceneB extends ErtaoGameScene {
    constructor () {
      super({key: 'sceneB'});
    }

    preload () {
      this.load.image('ball2', 'assets/sprites/shinyball.png');
    }

    create () {
      this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
      //
      for (let i = 0; i < 64; i++) {
        let ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball2');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
      }
      //
      this.input.once('pointerdown', (event) => {
        this.scene.transition({target: 'sceneA', duration: 2000});
      }, this);
    }


  }
})();
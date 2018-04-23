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
          gravity: {
            y: 0.3
          }
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
      this.sprite1 = null;
      this.sprite2 = null;
      //
      this.iter = 0;
    }

    preload () {
      this.load.image('platform', 'assets/sprites/platform.png');
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
      this.load.image('balls', 'assets/sprites/balls.png');
    }

    create () {
      this.sprite1 = this.add.tileSprite(100, 100, 150, 150, 'mushroom');
      this.sprite2 = this.add.tileSprite(0, -100, 200, 51, 'balls');
      //
      this.matter.add.gameObject(this.sprite1).setFrictionAir(0.001).setBounce(0.8);
      this.matter.add.gameObject(this.sprite2).setFrictionAir(0.001).setBounce(0.8);
      //
      this.matter.add.image(350, 500, 'platform', null, {isStatic: true}).setScale(2, 0.5).setAngle(9);
    }

    update () {
      this.sprite1.tilePositionX = Math.cos(this.iter) * 400;
      this.sprite1.tilePositionY = Math.sin(this.iter) * 400;
      //
      this.sprite2.tilePositionX = Math.cos(-this.iter) * 200;
      this.sprite2.tilePositionY = Math.sin(-this.iter) * 200;
      //
      this.iter += 0.01;
    }

    render () {
    }
  }
})();
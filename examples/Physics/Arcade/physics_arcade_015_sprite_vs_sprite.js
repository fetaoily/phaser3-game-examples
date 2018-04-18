(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: {y: 200}
        }
      },
      scene: [PlayGame]
    };
    this.game = this.game = new NewGame(this.gameConfig);
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
    }

    preload () {
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
      this.sprite1 = this.add.image(100, 100, 'mushroom');
      this.sprite2 = this.add.image(400, 100, 'mushroom');
      //
      this.physics.world.enable([this.sprite1, this.sprite2]);
      //
      this.sprite1.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
      this.sprite2.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
    }

    update () {
      this.physics.world.collide(this.sprite1, this.sprite2);
    }

    render () {
    }
  }
})();
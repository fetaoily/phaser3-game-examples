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
      this.sprite = null;
      this.static1 = null;
      this.static2 = null;
      this.static3 = null;
    }

    preload () {
      this.load.image('bar', 'assets/sprites/healthbar.png');
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
      this.sprite = this.physics.add.image(100, 100, 'mushroom');
      //
      this.static1 = this.physics.add.staticImage(400, 100, 'bar');
      this.static2 = this.physics.add.staticImage(100, 400, 'bar');
      this.static3 = this.physics.add.staticImage(500, 300, 'bar');
      //
      this.sprite.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
    }

    update () {
      this.physics.world.collide(this.sprite, [this.static1, this.static2, this.static3]);
    }

    render () {
    }
  }
})();
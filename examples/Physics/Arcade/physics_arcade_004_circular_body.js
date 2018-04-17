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
          gravity: {y: 100}
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
      this.load.image('wizball', 'assets/sprites/wizball.png');
    }

    create () {
      let ball1 = this.physics.add.image(100, 240, 'wizball');
      let ball2 = this.physics.add.image(700, 240, 'wizball');
      //
      ball1.setCircle(46);
      ball2.setCircle(46);
      //
      ball1.setCollideWorldBounds(true);
      ball2.setCollideWorldBounds(true);
      //
      ball1.setBounce(1);
      ball2.setBounce(1);
      //
      ball1.setVelocity(150);
      ball2.setVelocity(-200, 60);
      //
      this.physics.add.collider(ball1, ball2);
    }

    update () {
    }

    render () {
    }
  }
})();
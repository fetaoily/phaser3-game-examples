(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0}
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
      this.load.image('ball', 'assets/demoscene/doc-ball.png');
    }

    create () {
      let group = this.physics.add.group({
        key: 'ball',
        frameQuantity: 120,
        gridAlign: {
          x: 25,
          y: 25,
          width: 12,
          height: 12,
          cellWidth: 50,
          cellHeight: 50
        },
        bounceX: 1,
        collideWorldBounds: true
      });
      group.setVelocityX(200, 10);
    }

    update () {
    }

    render () {
    }
  }
})();
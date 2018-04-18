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
      this.load.image('ball', 'assets/demoscene/ball-tlb.png');
    }

    create () {
      let group = this.physics.add.group({
        key: 'ball', frameQuantity: 28,
        gridAlign: {
          x: 14,
          y: 14,
          width: 28,
          height: 1,
          cellWidth: 28
        },
        bounceY: 1,
        collideWorldBounds: true
      });
      group.setVelocityY(300, 10);
    }

    update () {
    }

    render () {
    }
  }
})();
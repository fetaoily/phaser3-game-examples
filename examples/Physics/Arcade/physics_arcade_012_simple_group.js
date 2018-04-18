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
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let group = this.physics.add.group({
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
      });
      //
      let block1 = group.create(100, 200, 'block').setVelocity(100, 100);
      let block2 = group.create(500, 200, 'block').setVelocity(-100, -100);
      let block3 = group.create(300, 400, 'block').setVelocity(60, 100);
      let block4 = group.create(600, 300, 'block').setVelocity(-30, -50);
      //
      this.physics.add.collider(group,group);
    }

    update () {
    }

    render () {
    }
  }
})();
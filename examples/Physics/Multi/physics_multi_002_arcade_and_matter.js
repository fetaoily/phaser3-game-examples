(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
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
      super({
        physics: {
          arcade: {
            debug: true,
            gravity: {y: 200}
          },
          matter: {
            debug: true,
            gravity: {y: 0.5}
          }
        }
      });
    }

    preload () {
      this.load.image('fuji', 'assets/sprites/fuji.png');
      this.load.image('block', 'assets/sprites/block.png');
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      // Matter JS:
      this.matter.add.image(400, -100, 'block');
      this.matter.add.image(360, -600, 'block');
      this.matter.add.image(420, -900, 'block');
      //
      this.matter.add.image(400, 550, 'platform', null, {isStatic: true});
      //  Arcade Physics:

      let block = this.physics.add.image(400, 100, 'fuji');

      block.setVelocity(100, 200);
      block.setBounce(1, 1);
      block.setCollideWorldBounds(true);
    }

    update () {
    }
  }
})();
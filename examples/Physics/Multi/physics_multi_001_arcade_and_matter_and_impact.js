(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        // default: 'matter',
        arcade: {
          debug: true,
          gravity: {y: 200}
        },
        matter: {
          debug: true,
          gravity: {y: 0.5}
        },
        impact: {
          gravity: 100,
          debug: true,
          setBounds: {
            x: 100,
            y: 100,
            width: 600,
            height: 300,
            thickness: 32
          },
          maxVelocity: 500
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
      this.load.image('fuji', 'assets/sprites/fuji.png');
      this.load.image('block', 'assets/sprites/block.png');
      this.load.image('platform', 'assets/sprites/platform.png');
      this.load.image('gem', 'assets/sprites/gem.png');
    }

    create () {
      //  Matter JS:
      this.matter.add.image(400, -100, 'block');
      this.matter.add.image(360, -600, 'block');
      this.matter.add.image(420, -900, 'block');
      // Impact Physics
      this.impact.add.image(300, 300, 'gem').setActive().setVelocity(300, 200).setBounce(1);
      // Arcade Physics
      this.physics.add.image(400, 100, 'fuji').setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

    }

    update () {
    }
  }
})();
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
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      this.matter.add.image(325, -100, 'block');
      this.matter.add.image(400, 300, 'block');
      this.matter.add.image(450, 50, 'block');
      //
      this.platform = this.matter.add.image(400, 550, 'platform', null, {isStatic: true});
    }

    update (time, delta) {
    }
  }
})();
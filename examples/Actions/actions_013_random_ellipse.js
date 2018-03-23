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
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
      this.group = null;
      this.ellipse = null;
    }

    preload() {
      this.load.image('orb', '/assets/sprites/orb-blue.png');
    }

    create() {
      this.group = this.add.group({
        key: 'orb',
        frameQuantity: 300
      });
      this.ellipse = new Phaser.Geom.Ellipse(400, 300, 100, 200);
      //
      Phaser.Actions.RandomEllipse(this.group.getChildren(), this.ellipse);
    }

    update() {}

    render() {}
  }
})();

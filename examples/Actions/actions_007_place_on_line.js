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
      this.line = null;
      this.group = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.line = new Phaser.Geom.Line(100, 200, 600, 400);
      this.group = this.add.group({
        key: 'ball',
        frameQuantity: 32
      });
      Phaser.Actions.PlaceOnLine(this.group.getChildren(), this.line);
    }

    update() {}

    render() {}
  }
})();

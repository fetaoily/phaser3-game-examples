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
      this.rect = null;
      this.group = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.rect = new Phaser.Geom.Rectangle(100, 100, 256, 256);
      this.group = this.add.group({ key: 'ball', frameQuantity: 32 });
      //
      Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);
    }

    update() {
      let children = this.group.getChildren();
      Phaser.Actions.IncXY(children, 1, 1);
      // Phaser.Actions.WrapInRectangle(children, this.rect); // version>=3.3.0
    }

    render() {}
  }
})();

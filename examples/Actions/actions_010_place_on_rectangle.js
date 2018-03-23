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
      Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), this.rect);
    }

    update() {}

    render() {}
  }
})();

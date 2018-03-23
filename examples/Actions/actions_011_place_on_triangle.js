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
      this.triangle = null;
      this.group = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/chunk.png');
    }

    create() {
      this.triangle = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);
      //
      this.group = this.add.group({ key: 'ball', frameQuantity: 64 });
      //
      Phaser.Actions.PlaceOnTriangle(this.group.getChildren(), this.triangle);
    }

    update() {}

    render() {
      
    }
  }
})();

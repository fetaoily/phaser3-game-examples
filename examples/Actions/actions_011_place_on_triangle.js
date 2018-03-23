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
      this.group1 = null;
      this.group2 = null;
      this.triangle1 = null;
      this.triangle2 = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/chunk.png');
    }

    create() {
      this.group1 = this.add.group({ key: 'ball', frameQuantity: 64 });
      this.group2 = this.add.group({ key: 'ball', frameQuantity: 300 });
      //
      this.triangle1 = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);
      this.triangle2 = new Phaser.Geom.Triangle.BuildEquilateral(400, 200, 380);
      //
      Phaser.Actions.PlaceOnTriangle(this.group1.getChildren(), this.triangle1);
      Phaser.Actions.PlaceOnTriangle(this.group2.getChildren(), this.triangle2);
    }

    update() {}

    render() {}
  }
})();

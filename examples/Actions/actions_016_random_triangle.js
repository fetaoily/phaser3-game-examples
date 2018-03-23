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
      this.load.image('orb', '/assets/sprites/orb-blue.png');
    }

    create() {
      this.group1 = this.add.group({ key: 'orb', frameQuantity: 300 });
      this.group2 = this.add.group({ key: 'orb', frameQuantity: 300 });
      //
      this.triangle1 = new Phaser.Geom.Triangle.BuildEquilateral(400, 100, 380);
      //
      this.triangle2 = new Phaser.Geom.Triangle.BuildRight(20, 500, 300, 200);
      //
      Phaser.Actions.RandomTriangle(this.group1.getChildren(), this.triangle1);
      //
      Phaser.Actions.RandomTriangle(this.group2.getChildren(), this.triangle2);
    }

    update() {}

    render() {}
  }
})();

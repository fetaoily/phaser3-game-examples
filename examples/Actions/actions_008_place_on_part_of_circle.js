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
      this.group3 = null;
      this.group4 = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.group1 = this.add.group({ key: 'ball', frameQuantity: 16 });
      this.group2 = this.add.group({ key: 'ball', frameQuantity: 16 });
      this.group3 = this.add.group({ key: 'ball', frameQuantity: 16 });
      this.group4 = this.add.group({ key: 'ball', frameQuantity: 16 });
      //
      Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), {
        x: 400,
        y: 300,
        radius: 200
      });
      //
      Phaser.Actions.PlaceOnCircle(this.group2.getChildren(), {
        x: 400,
        y: 300,
        radius: 160
      });
      //
      Phaser.Actions.PlaceOnCircle(this.group3.getChildren(), {
        x: 400,
        y: 300,
        radius: 120
      });
      //
      Phaser.Actions.PlaceOnCircle(this.group4.getChildren(), {
        x: 400,
        y: 300,
        radius: 80
      });
    }

    update() {
      Phaser.Actions.RotateAroundDistance(
        this.group1.getChildren(),
        { x: 400, y: 300 },
        0.02,
        200
      );
      Phaser.Actions.RotateAroundDistance(
        this.group2.getChildren(),
        { x: 400, y: 300 },
        -0.02,
        160
      );
      Phaser.Actions.RotateAroundDistance(
        this.group3.getChildren(),
        { x: 400, y: 300 },
        0.02,
        120
      );
      Phaser.Actions.RotateAroundDistance(
        this.group4.getChildren(),
        { x: 400, y: 300 },
        -0.02,
        80
      );
    }

    render() {}
  }
})();

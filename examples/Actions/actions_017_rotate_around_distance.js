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
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.group = this.add.group();
      for (let i = 0; i < 32; i++) {
        this.group.create(i * 32, i * 2, 'ball');
      }
    }

    update() {
      Phaser.Actions.RotateAroundDistance(
        this.group.getChildren(),
        { x: 400, y: 300 },
        0.02,
        200
      );
    }

    render() {}
  }
})();

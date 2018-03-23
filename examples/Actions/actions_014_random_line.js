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
      this.line = null;
    }

    preload() {
      this.load.image('orb', '/assets/sprites/orb-blue.png');
    }

    create() {
      this.group = this.add.group({ key: 'orb', frameQuantity: 300 });
      this.line = new Phaser.Geom.Line(200, 200, 500, 400);
      //
      Phaser.Actions.RandomLine(this.group.getChildren(), this.line);
    }

    update() {}

    render() {}
  }
})();

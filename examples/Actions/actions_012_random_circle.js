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
      this.circle = null;
    }

    preload() {
      this.load.image('orb', '/assets/sprites/orb-blue.png');
    }

    create() {
      this.group = this.add.group({ key: 'orb', frameQuantity: 300 });
      this.circle = new Phaser.Geom.Circle(400, 300, 130);
      //
      Phaser.Actions.RandomCircle(this.group.getChildren(), this.circle);
    }

    update() {}

    render() {}
  }
})();

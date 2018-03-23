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
      this.rect = null;
    }

    preload() {
      this.load.image('orb', '/assets/sprites/orb-blue.png');
    }

    create() {
      this.group = this.add.group({ key: 'orb', frameQuantity: 300 });
      this.rect = new Phaser.Geom.Rectangle(300, 300, 300, 100);
      //
      Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);
    }

    update() {}

    render() {}
  }
})();

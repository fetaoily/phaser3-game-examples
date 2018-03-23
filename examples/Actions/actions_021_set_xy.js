(() => {
  'use strict';
  let game;
  let gameConfig;

  window.onload = () => {
    this.gameConfig = gameConfig = { scene: [PlayGame] };
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
      this.image = null;
    }

    preload() {
      this.load.image('phaser', '/assets/sprites/phaser2.png');
    }

    create() {
      this.group = this.add.group();
      this.image = this.add.image(0, 0, 'phaser');
      //
      this.group.add(this.image);
      //
      Phaser.Actions.SetXY(this.group.getChildren(), 400, 300);
    }

    update() {}

    render() {}
  }
})();

(() => {
  'use strict';
  let game;
  let gameConfig;

  window.onload = () => {
    window.gameConfig = gameConfig = {
      scene: [PlayGame]
    };
    game = new NewGame(gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
      this.ellipse = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.ellipse = new Phaser.Geom.Ellipse(
        400, //x
        300, //y
        200, // width
        500 // height
      );
      //
      this.group = this.add.group({
        key: 'ball',
        frameQuantity: 48
      });
      //
      Phaser.Actions.PlaceOnEllipse(this.group.getChildren(), this.ellipse);
      //
      this.tween = this.tweens.add({
        targets: this.ellipse,
        width: 700,
        height: 100,
        delay: 1000,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
      });
    }

    update() {
      Phaser.Actions.PlaceOnEllipse(this.group.getChildren(), this.ellipse);
    }

    render() {}
  }
})();

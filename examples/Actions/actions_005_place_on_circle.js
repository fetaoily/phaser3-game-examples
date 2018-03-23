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
      this.group = null;
      this.tween = null;
    }

    preload() {
      this.load.image('ball', '/assets/sprites/shinyball.png');
    }

    create() {
      this.circle = new Phaser.Geom.Circle(400, 300, 260);
      this.group = this.add.group({
        key: 'ball',
        frameQuantity: 32
      });
      //
      Phaser.Actions.PlaceOnCircle(this.group.getChildren(), this.circle);
      //
      this.tween = this.tweens.addCounter({
        from: 260,
        to: 0,
        duration: 3000,
        delay: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
      });
    }

    update() {
      Phaser.Actions.RotateAroundDistance(
        this.group.getChildren(),
        { x: 400, y: 300 },
        0.02,
        this.tween.getValue()
      );
    }

    render() {}
  }
})();

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
      this.circle = null;
    }

    preload() {
      this.load.spritesheet('balls', '/assets/sprites/balls.png', {
        frameWidth: 17,
        frameHeight: 17
      });
    }

    create() {
      // window.circle = this.circle = Phaser.Geom.Circle(400, 300, 220);
      window.circle = this.circle = new Phaser.Geom.Circle(400, 300, 220);
      window.group = this.group = this.add.group({
        key: 'balls',
        frame: [0, 1, 5],
        repeat: 10
      });
      Phaser.Actions.PlaceOnCircle(this.group.getChildren(), this.circle);
      //
      this.tween = this.tweens.addCounter({
        from: 220,
        to: 50,
        duration: 3000,
        delay: 2000,
        ease: 'Sine.easeInOut',
        replace: -1,
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

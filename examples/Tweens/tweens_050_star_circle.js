(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      scene: [PlayGame]
    };
    this.gameConfig = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor () {
      super();
    }

    preload () {
      this.load.image('star', 'assets/demoscene/star.png');
    }

    create () {
      let starts = this.add.group({ key: 'star', repeat: 30 });
      let circle = new Phaser.Geom.Circle(400, 300, 32);
      // starts.placeOnCircle(circle);
      Phaser.Actions.PlaceOnCircle(starts.getChildren(), circle);
      //
      this.tweens.add({
        targets: circle,
        radius: 200,
        ease: 'Quintic.easeInOut',
        duration: 1500,
        yoyo: true,
        repeat: -1,
        onUpdate () {
          // starts.rotateAroundDistance({ x: 400, y: 300 }, 0.02, circle.radius);
          Phaser.Actions.RotateAroundDistance(starts.getChildren(), { x: 400, y: 300 }, 0.02, circle.radius);
        }
      });
    }

    update () {
    }
  }
})();
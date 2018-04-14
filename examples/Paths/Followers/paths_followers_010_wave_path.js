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
    }
    preload() {
      this.load.image('eyes', 'assets/sprites/eyes.png');
      this.load.image('orb', 'assets/particles/green-orb.png');
    }
    create() {
      let graphics = this.add.graphics();
      let path = new Phaser.Curves.Path(0, 300);
      //
      for (let i = 0; i < 8; i++) {
        // xRadius, yRadius, startAngle, endAngle, clockwise, rotation
        if (i % 2 === 0) {
          path.ellipseTo(50, 80, 180, 360, true, 0);
        } else {
          path.ellipseTo(50, 80, 180, 360, false, 0);
        }
      }
      //
      graphics.lineStyle(1, 0xffffff, 1);
      //
      path.draw(graphics);
      //
      for (let i = 0; i < 20; i++) {
        let follower = null;
        if (i === 0) {
          follower = this.add
            .follower(path, 100, 100 + 30 * i, 'eyes')
            .setDepth(50);
        } else {
          follower = this.add.follower(path, 100, 100 + 30 * i, 'orb');
          follower.setBlendMode(Phaser.BlendModes.ADD);
          follower.setScale(0.5);
        }
        //
        follower.startFollow({
          duration: 4000,
          positionOnPath: true,
          repeat: -1,
          // ease:'Linear',
          ease: 'Sine.easeInOut',
          delay: i * 70
        });
      }
    }
    update() {}
    render() {}
  }
})();

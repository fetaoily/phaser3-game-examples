(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      backgroundColor: '#000000',
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
      this.load.json('all', 'assets/paths/types-test.json');
      this.load.image('ship', 'assets/sprites/bsquadron2.png');
    }
    create() {
      let path = new Phaser.Curves.Path(this.cache.json.get('all'));
      let graphics = this.add.graphics().lineStyle(1, 0x2d2d2d, 1);
      //
      path.draw(graphics);
      //
      for (let i = 0; i < 20; i++) {
        let follower = this.add.follower(path, 0, 0, 'ship');
        follower.startFollow({
          duration: 8000,
          positionOnPath: true,
          repeat: -1,
          yoyo: true,
          ease: 'Linear',
          delay: i * 70
        });
      }
    }
    update() {}
    render() {}
  }
})();

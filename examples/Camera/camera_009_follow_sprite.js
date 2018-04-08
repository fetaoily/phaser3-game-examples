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
    constructor (config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor () {
      super();
      this.clown = null;
      this.image = null;
      this.iter = Math.PI;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
      this.load.image('clown', 'assets/sprites/clown.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'CherilPerils');
      //
      this.clown = this.add.image(500, 600, 'clown');
      //
      this.image.originX = 0;
      this.image.originY = 0;
      //
      this.cameras.main.setSize(400, 300);
      this.cameras.add(400, 0, 400, 300);
      this.cameras.add(0, 300, 400, 300);
      this.cameras.add(400, 300, 400, 300);
      //
      this.cameras.main.startFollow(this.clown);

    }

    update () {
      this.clown.x = 250 + Math.cos(this.iter) * 200;
      this.clown.y = 310 + Math.sin(this.iter) * 200;
      this.iter += 0.02;
    }

    render () {
    }
  }
})();
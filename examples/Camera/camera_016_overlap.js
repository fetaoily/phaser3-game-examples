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
      this.iter = 0;
      this.image = null;
      this.smallCamera = null;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'CherilPerils').setOrigin(0);
      //
      this.smallCamera = this.cameras.add(570, 30, 200, 200);
    }

    update () {
      let halfWidth = this.image.texture.source[0].width / 2;
      let quarterWidth = halfWidth / 2;
      let halfHeight = this.image.texture.source[0].height / 2;
      let quarterHeight = halfHeight / 2;
      //
      this.smallCamera.scrollX = halfWidth + Math.cos(this.iter) * halfWidth;
      // this.smallCamera.scrollY = halfHeight + Math.sin(this.iter) * halfHeight;
      //
      this.iter += 0.02;
    }

    render () {
    }
  }
})();
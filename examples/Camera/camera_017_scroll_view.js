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
      this.horizontalCamera = null;
      this.verticalCamera = null;
      this.circularCamera = null;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
      this.load.image('clown', 'assets/sprites/clown.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'CherilPerils').setOrigin(0);
      //
      this.cameras.main.setSize(400, 300);
      //
      this.horizontalCamera = this.cameras.add(400, 0, 400, 300);
      this.verticalCamera = this.cameras.add(0, 300, 400, 300);
      this.circularCamera = this.cameras.add(400, 300, 400, 300);
      //
      for (let i = 0; i < 1000; i++) {
        this.add.image(Math.random() * 1000, Math.random() * 1240, 'clown');
      }
    }

    update () {
      let halfWidth = this.image.texture.source[0].width / 2;
      let quarterWidth = halfWidth / 2;
      let halfHeight = this.image.texture.source[0].height / 2;
      let quarterHeight = halfHeight / 2;
      //
      this.horizontalCamera.scrollX = (halfWidth - quarterWidth + (Math.cos(this.iter) * quarterWidth)) | 0;
      this.verticalCamera.scrollY = (halfHeight - quarterHeight + (Math.sin(this.iter) * quarterHeight)) | 0;
      this.circularCamera.scrollX = (halfWidth - quarterWidth + (Math.cos(this.iter) * quarterWidth)) | 0;
      this.circularCamera.scrollY = (halfHeight - quarterHeight + (Math.sin(this.iter) * quarterHeight)) | 0;
      //
      this.iter += 0.02;
    }

    render () {
    }
  }
})();
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
      this.image = null;
      this.ui_camera = null;
      this.ui_text1 = null;
      this.ui_text2 = null;
      this.ui_text3 = null;
    }

    preload () {
      this.load.baseURL = '//examples.phaser.io/';
      this.load.crossOrigin = 'anonymous';
      this.load.image('einstein', 'assets/pics/ra_einstein.png');
    }

    create () {
      this.image = this.add.image(400, 300, 'einstein');
      //
      this.ui_text1 = this.add.text(400, 50, '0');
      this.ui_text2 = this.add.text(400, 100, '0');
      this.ui_text3 = this.add.text(400, 150, '0');
      //
      this.ui_camera = this.cameras.add(0, 0, 800, 600);
      //
      this.cameras.main.ignore([this.ui_text1, this.ui_text2, this.ui_text3]);
      this.ui_camera.ignore(this.image);
    }

    update () {
      this.ui_text1.setText('main camera rotation: ' + this.cameras.main.rotation);
      this.ui_text2.setText('main camera zoom: ' + this.cameras.main.zoom);
      this.ui_text3.setText('main camera shake X:' + this.cameras.main._shakeOffsetX);
      // //
      this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1);
      this.cameras.main.rotation += 0.01;
      this.cameras.main.shake(500, 0.001);
    }

    render () {
    }
  }
})();
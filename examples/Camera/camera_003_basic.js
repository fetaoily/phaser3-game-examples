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
    }

    preload () {
      this.load.image('robot', 'assets/pics/robota-uxo-by-made-of-bomb.jpg');
    }

    create () {
      this.gui = new dat.GUI();
      // Our image is 1920 x 980
      // Our game canvas is 800 x 600
      this.add.image(0, 0, 'robot').setOrigin(0);
      //
      this.camera1 = this.cameras.main;
      this.camera1 = this.cameras.add(0, 0, 400, 300).setZoom(0.5);
      //
      this.gui.addFolder('Camera 1');
      this.gui.add(this.camera1, 'x');
      this.gui.add(this.camera1, 'y');
      this.gui.add(this.camera1, 'width');
      this.gui.add(this.camera1, 'height');
      this.gui.add(this.camera1, 'centerToSize');
      this.gui.add(this.camera1, 'scrollX', -1920, 1920);
      this.gui.add(this.camera1, 'scrollY', -989, 989);
      this.gui.add(this.camera1, 'zoom', 0.1, 2).step(0.01);
      this.gui.addColor(this.camera1, 'backgroundColor').onChange((value) => {
        value.a = 255;
        this.camera1.setBackgroundColor(value);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
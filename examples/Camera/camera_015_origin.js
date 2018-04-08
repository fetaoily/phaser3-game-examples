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
      this.camera0 = null;
      this.camera1 = null;
      this.camera2 = null;
      this.camera3 = null;
    }

    preload () {
      this.load.image('einstein', 'assets/pics/ra-einstein.png');
    }

    create () {
      this.image = this.add.image(200, 150, 'einstein');
      //
      this.cameras.main.setSize(400, 300);
      //
      this.camera0 = this.cameras.main;
      this.camera1 = this.cameras.add(400, 0, 400, 300);
      this.camera2 = this.cameras.add(0, 300, 400, 300);
      this.camera3 = this.cameras.add(400, 300, 400, 300);
    }

    update () {
      this.camera0.zoom = 0.5 + Math.abs(Math.sin(this.iter));
      this.camera0.scrollX = Math.sin(this.iter) * 400;
      //
      this.camera1.rotation = this.iter;
      //
      this.camera2.scrollX = Math.cos(this.iter) * 100;
      this.camera2.scrollY = Math.sin(this.iter) * 100;
      this.camera2.zoom = 0.5 + Math.abs(Math.sin(this.iter));
      this.camera2.rotation = -this.iter;
      //
      this.camera3.zoom = 0.5 + Math.abs(Math.sin(this.iter));
      //
      this.iter += 0.01;
    }

    render () {
    }
  }
})();
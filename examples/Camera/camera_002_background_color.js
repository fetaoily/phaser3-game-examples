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
      this.shakeTime = 0;
      this.objects = {};
    }

    preload () {
      this.load.image('image', 'assets/sprites/mushroom2.png');
    }

    create () {
      this.objects.camera = this.cameras.add(0, 0, 400, 300);
      this.objects.image0 = this.add.image(400, 300, 'image');
      this.objects.image1 = this.add.image(400, 300, 'image');
      this.objects.image2 = this.add.image(400, 300, 'image');
      this.objects.image3 = this.add.image(400, 300, 'image');
      //
      this.objects.move = 0.0;
      this.objects.camera.zoom = 0.5;
      this.objects.camera.scrollX = 200;
      this.objects.camera.scrollY = 150;
      this.objects.camera.setBackgroundColor('rgba(255,0,0,0.5)');
    }

    update (time, delta) {
      this.objects.image0.x = 400 + Math.cos(this.objects.move) * 300;
      this.objects.image0.y = 300 + Math.sin(this.objects.move * 2) * 200;
      //
      this.objects.image1.x = 400 + Math.sin(this.objects.move * 2) * 300;
      this.objects.image1.y = 300 + Math.cos(this.objects.move) * 200;
      //
      this.objects.image2.y = 300 + Math.cos(this.objects.move * 2) * 400;
      this.objects.image3.x = 400 + Math.sin(this.objects.move * 2) * 400;
      //
      this.objects.move += 0.02;
    }

    render () {
    }
  }
})();
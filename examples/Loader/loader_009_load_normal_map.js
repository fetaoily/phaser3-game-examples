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
      this.load.image('robot', ['assets/pics/equality-by-ragnarok.png', 'assets/normal-maps/equality-by-ragnarok_n.png']);
    }

    create () {
      let robot = this.add.image(-300, 0, 'robot').setOrigin(0);
      let canvasTexture = this.textures.createCanvas('normalMap', 400, 600);
      let canvas = canvasTexture.getSourceImage();
      let context = canvas.getContext('2d');
      //
      context.drawImage(robot.texture.dataSource[0].image, -300, 0);
      let robotMap = this.add.image(400, 0, 'normalMap').setOrigin(0);
    }

    update () {
    }

    render () {
    }
  }
})();
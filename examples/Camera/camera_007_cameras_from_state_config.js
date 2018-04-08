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
      let cameras = [
        {x: 0, y: 0, width: 400, height: 300, backgroundColor: '#ff0000'},
        {x: 400, y: 0, width: 400, height: 300, backgroundColor: '#ff00ff'},
        {x: 0, y: 300, width: 400, height: 300, backgroundColor: '#ffff00'},
        {x: 400, y: 300, width: 400, height: 300, backgroundColor: '#00ff00'}
      ];
      super({
        cameras: cameras
      });
    }

    preload () {
      this.load.image('mech', 'assets/pics/titan-mech.png');
    }

    create () {
      this.image = this.add.image(200, 150, 'mech');
    }

    update () {
      this.image.rotation += 0.01;
    }

    render () {
    }
  }
})();
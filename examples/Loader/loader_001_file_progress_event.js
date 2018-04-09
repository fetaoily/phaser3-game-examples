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
      super({
        files: [
          {type: 'image', key: 'bear', url: 'assets/pics/alex-bear.png'}
        ]
      });
    }

    preload () {
      this.add.image(400, 300, 'bear').setScale(2);
      //
      let progress = this.add.graphics();
      //
      this.load.on('fileprogress', (file, value) => {
        if (file.key === 'goldrunner') {
          progress.clear();
          progress.fillStyle(0xffffff, 0.4);
          progress.fillRect(450, 500 - (value * 400), 200, value * 400);
        }
      });
      //
      this.load.on('complete', () => {
        progress.destroy();
      });
      //
      this.load.audio('goldrunner', 'assets/audio/Scyphe-Goldrunner_(Maccie_Pimp_Me Up_Remix).mp3');
    }

    create () {
      let music = this.sound.add('goldrunner');
      music.play();
    }

    update () {
    }

    render () {
    }
  }
})();
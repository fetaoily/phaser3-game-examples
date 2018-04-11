(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      pixelArt: true,
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
      progress.fillStyle(0xffffff);
      // 3 progress bars, one per file.
      this.load.on('fileprogress', (file, value) => {
        // progress.clear();
        if (file.key === 'goldrunner') {
          progress.fillRect(400, 500 - (value * 400), 60, value * 400);
        } else if (file.key === 'heroquest') {
          progress.fillRect(510, 500 - (value * 400), 60, value * 400);
        } else if (file.key === 'goa') {
          progress.fillRect(620, 500 - (value * 400), 60, value * 400);
        }
      });
      //
      this.load.on('progress', (value) => {
        progress.fillRect(0, 300, 800 * value, 60);
      });
      //
      this.load.audio('goldrunner', 'assets/audio/Scyphe-Goldrunner_(Maccie_Pimp_Me Up_Remix).mp3');
      this.load.audio('heroquest', 'assets/audio/Totta-HeroQuest-Pophousedub-remix.mp3');
      this.load.audio('goa', 'assets/audio/tommy_in_goa.mp3');
    }

    create () {
      let music = this.sound.add('goa');
      music.play();
    }

    update () {
    }

    render () {
    }
  }
})();
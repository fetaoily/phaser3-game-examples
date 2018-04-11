(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      loader: {
        baseURL: 'assets'
      },
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
        loader: {
          path: 'sprites'
        }
      });
    }

    preload () {
      // Load via an object
      // this.load.image({
      //   key: 'bunny', file: 'assets/sprites/bunny.png'
      // });
      // Load via an array of objects
      // this.load.image([
      //   {key: 'bunny', file: 'assets/sprites/bunny.png'},
      //   {key: 'atari', file: 'assets/sprites/atari400.png'},
      //   {key: 'logo', file: 'assets/sprites/phaser2.png'}
      // ]);

      // Object based including XHR Settings
      // this.load.image({
      //   key: 'bunny',
      //   file: 'assets/sprites/bunny.png',
      //   xhr: {
      //     user: 'root',
      //     password: 'th3G1bs0n',
      //     header: 'Content-Type',
      //     headerValue: 'image/png'
      //   }
      // });

      // Auto-filename based on key:
      // Will load bunny.png from the defined path, because '.png' is the default extension.
      this.load.image({key: 'bunny'});

      // Will load bunny.jpg from the defined path, because of the 'ext' property.
      // this.load.image({ key: 'bunny', ext: 'jpg' });

      // -----------------------
      // Texture Atlas Examples
      // -----------------------
      // Original atlas loader signature:
      // this.load.atlas(KeyboardEvent, textureURL,atlasURL,textureXhrSettings,atlasXhrSettings)
      // this.load.atlas('level1','/assets/level1/items.png','/assets/level1/items.json');

      // Object based
      // this.load.atlas({key: 'level1', texture: 'assets/level1/items.png', data: 'assets/level1/items.json'});
    }

    create () {
      this.add.image(400, 300, 'bunny');
    }

    update () {
    }

    render () {
    }
  }
})();
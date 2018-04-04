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
      this.load.json('jsonData', '/assets/atlas/megaset-0.json');
    }

    create () {
      console.log(this.cache.json.get('jsonData'));
    }

    update () {
    }

    render () {
    }
  }
})();
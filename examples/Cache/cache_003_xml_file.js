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
      this.load.xml('data', '/assets/loader-tests/test.xml');
    }

    create () {
      let catalog = this.cache.xml.get('data');
      let books = catalog.getElementsByTagName('book');
      for (let i = 0; i < books.length; i++) {
        let item = books[i];
        console.log(item.getAttribute('id'));
      }
    }

    update () {
    }

    render () {
    }
  }
})();
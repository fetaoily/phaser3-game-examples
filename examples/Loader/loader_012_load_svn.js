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
      this.counter = 0;
      this.scaleTimer = 0;
    }

    preload () {
      this.load.svg('pencil', 'assets/svg/pencil.svg');
      this.load.svg('cartman', 'assets/svg/cartman.svg');
      //
      this.load.svg({key: 'pencil', file: 'assets/svg/pencil.svg'});
      this.load.svg({key: 'cartman', file: 'assets/svg/cartman.svg'});
      //
      this.load.setPath('assets/svg');
      //
      this.load.svg([
        {key: 'pencil'},
        {key: 'cartman'}
      ]);
    }

    create () {
      this.pencil = this.add.image(400, 300, 'pencil');
      this.cartman = this.add.image(150, 300, 'cartman');
    }

    update (time, delta) {
      if (time > this.scaleTimer) {
        this.counter++;
        this.cartman.setScale(Math.abs(3 * Math.sin(this.counter)));
        this.scaleTimer = time + 200;
      }
    }

    render () {
    }
  }
})();
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
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
    }

    preload() {
      this.load.atlas(
        'cards',
        '/assets/atlas/cards.png',
        '/assets/atlas/cards.json'
      );
    }

    create() {
      this.card1 = this.add.image(200, 100, 'cards', 'heartsAce');
      this.card2 = this.add.image(400, 100, 'cards', 'hearts2');
      this.card3 = this.add.image(600, 100, 'cards', 'hearts3');
      //
      this.card1.setScrollFactor(1);
      this.card2.setScrollFactor(0.6);
      this.card3.setScrollFactor(0.3);
      //
      this.cam = this.cameras.main;
      //
      // this.cam.centerToSize();
    }

    update() {
      this.cam.scrollX += 1;
      this.cam.scrollY -= 0.5;
      //
      this.card1.y += 0.5;
      this.card2.y += 0.5;
      this.card3.y += 0.5;
    }

    render() {}
  }
})();

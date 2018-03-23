(() => {
  'use strict';
  let game;
  let gameConfig;

  window.onload = () => {
    this.gameConfig = gameConfig = { scene: [PlayGame] };
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
      this.x = null;
      this.y = null;
      this.move = 0;
      this.group = null;
    }

    preload() {
      this.load.image('sky', '/assets/skies/deepblue.png');
      this.load.image('ball', '/assets/demoscene/ball-tlb.png');
    }

    create() {
      this.add.image(0, 0, 'sky').setOrigin(0);
      //
      this.group = this.add.group({ key: 'ball', frameQuantity: 128 });
      //
      this.input.on('pointermove', pointer => {
        this.x = pointer.x;
        this.y = pointer.y;
      });
    }

    update(time, delta) {
      this.move += delta;
      if (this.move > 6) {
        Phaser.Actions.ShiftPosition(this.group.getChildren(), this.x, this.y);
        this.move = 0;
      }
    }

    render() {}
  }
})();

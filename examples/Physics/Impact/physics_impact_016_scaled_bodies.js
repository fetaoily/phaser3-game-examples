(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          gravity: 100,
          maxVelocity: 300
        }
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
      super();
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      this.impact.world.setBounds();
      //
      this.bigBlock = this.impact.add.image(300, 100, 'block').setActive().setBounce(1).setVelocity(200, 100);
      // Scale the Image and the body together
      this.bigBlock.setBodyScale(2);
      // You can also scale the image using the normal scale method, but you must sync if after doing so:
      this.bigBlock.setScale(3);
      this.bigBlock.syncGameObject();
      //
      let smallBlock = this.impact.add.image(100, 500, 'block').setActive().setBounce(2).setVelocity(-200, -100);
      // Scale the Image and the body together
      smallBlock.setBodyScale(0.5);
      //
      let wideBlock = this.impact.add.image(600, 400, 'block').setActive().setBounce(3).setVelocity(-200, -100);
      // Scale the Image and the body together
      wideBlock.setBodyScale(2, 0.5);

    }
  }
})();
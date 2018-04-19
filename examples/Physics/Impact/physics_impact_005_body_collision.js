(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact'
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
      let blockA = this.impact.add.image(300, 300, 'block');
      let blockB = this.impact.add.image(60, 300, 'block');
      let blockC = this.impact.add.image(730, 300, 'block');
      //
      blockA.setTypeA().setCheckAgainstB().setActive().setMaxVelocity(300);
      blockB.setTypeB().setCheckAgainstA().setFixed();
      blockC.setTypeB().setCheckAgainstA().setFixed();
      //
      blockA.setBounce(1).setVelocityX(300);
    }

    update () {
    }

    render () {
    }
  }

})();
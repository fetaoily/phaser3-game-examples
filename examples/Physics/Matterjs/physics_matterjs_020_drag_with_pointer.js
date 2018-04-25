(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true
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
      this.matter.world.setBounds();
      //
      this.matter.add.image(400, 180, 'block', null, {chamfer: 16}).setBounce(0.9);
      // These both do the thing:
      // this.matter.add.pointerConstraint({length: 1, stiffness: 0.6});
      this.matter.add.mouseSpring({length: 1, stiffness: 0.6});
    }

    update () {
    }

    render () {
    }
  }
})();
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
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      this.matter.world.setBounds();
      // this body isn't effect y gravity
      this.matter.add.image(100, 100, 'block').setIgnoreGravity(true);
      //
      this.matter.add.image(250, 100, 'block');
      this.matter.add.image(400, 100, 'block', null, {restitution: 0.6, frictionAir: 0, mass: 0.1});
      this.matter.add.image(550, 100, 'block', null, {restitution: 0.8, frictionAir: 0, mass: 0.1});
      this.matter.add.image(700, 100, 'block', null, {restitution: 1, frictionAir: 0, mass: 0.1});
    }

    update () {
    }

    render () {
    }
  }

})();
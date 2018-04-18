(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
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
      this.load.image('atari', 'assets/sprites/atari130xe.png');
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
      let atari = this.physics.add.image(200, 400, 'atari').setImmovable(true);
      // In this example the new collision box is much larger than the original sprite
      // 220x104 original size, 300x400 new size, the 'true' argument means "center it on the gameObject"
      atari.setSize(300, 260, true);
      // And this sprite will collide with it
      let mushroom1 = this.physics.add.image(700, 350, 'mushroom');
      let mushroom2 = this.physics.add.image(200, 50, 'mushroom');
      //
      mushroom1.setVelocity(-100, 0);
      mushroom2.setVelocity(0, 100);
      //
      this.physics.add.collider(atari, [mushroom1, mushroom2]);
    }

    update () {
    }

    render () {
    }
  }
})();
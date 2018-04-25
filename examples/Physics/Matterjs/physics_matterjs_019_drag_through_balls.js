(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          // debug: true
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
      this.load.image('blue', 'assets/particles/blue.png');
    }

    create () {
      this.matter.world.setBounds(0, 0, 800, 550);
      //
      for (let i = 0; i < 256; i++) {
        let particle = this.matter.add.image(
            Phaser.Math.Between(0, 800),
            Phaser.Math.Between(0, 400),
            'blue', null,
            {shape: {type: 'polygon', radius: 18}, ignorePointer: true}
        );
        //
        particle.setScale(0.8);
        particle.setBlendMode('ADD');
        particle.setFriction(0.005);
        particle.setBounce(0.8);
        particle.setMass(1);
      }
      //
      let block = this.block = this.matter.add.image(400, 0, 'block').setBounce(0.8).setMass(600);
      //
      this.matter.add.mouseSpring();
    }

    update () {
      this.block.angle += 10;
    }

    render () {
    }
  }
})();
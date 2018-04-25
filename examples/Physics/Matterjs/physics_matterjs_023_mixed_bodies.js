(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            y: 0
          },
          enableSleep: true
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
    }

    create () {
      this.matter.world.setBounds();
      // Let's create a bunch of random shaped objects and add them to the world
      for (let i = 0; i < 48; i++) {
        let x = Phaser.Math.Between(100, 700);
        let y = Phaser.Math.Between(100, 500);
        //
        if (Math.random() < 0.7) {
          let sides = Phaser.Math.Between(3, 14);
          let radius = Phaser.Math.Between(8, 50);
          //
          this.matter.add.polygon(x, y, sides, radius, {restitution: 0.9});
        } else {
          let width = Phaser.Math.Between(16, 128);
          let height = Phaser.Math.Between(8, 64);
          //
          this.matter.add.rectangle(x, y, width, height, {restitution: 0.9});
        }
      }
      //
      this.matter.add.mouseSpring();
    }

    update () {
    }

    render () {
    }
  }
})();
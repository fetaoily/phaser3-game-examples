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
            y: 0.3
          }
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
      this.load.image('platform', 'assets/sprites/platform.png');
      this.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel.png', 'assets/fonts/bitmap/desyrel.xml');
    }

    create () {
      let text = this.add.bitmapText(140, -100, 'desyrel', 'Phaser 3');
      //
      this.matter.add.gameObject(text, {render: {sprite: {yOffset: 0.2}}});
      //
      text.setFrictionAir(0.001);
      text.setBounce(0.9);
      //
      this.matter.add.image(350, 450, 'platform', null, {isStatic: true}).setScale(2, 0.5).setAngle(10);
    }

    update () {
    }

    render () {
    }
  }
})();
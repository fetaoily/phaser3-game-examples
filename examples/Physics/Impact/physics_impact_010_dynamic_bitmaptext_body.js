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
          maxVelocity: 500
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
      this.rainbowColor = 0;
      this.rainbowColorIdx = 0;
      this.rainbowColorOffset = 0;
      this.delay = 0;
      this.rainbowWave = 0;

    }

    preload () {
      this.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel.png', 'assets/fonts/bitmap/desyrel.xml');
      this.load.bitmapFont('hyper', 'assets/fonts/bitmap/hyperdrive.png', 'assets/fonts/bitmap/hyperdrive.xml');
    }

    create () {
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create a Bitmap Text object
      let text1 = this.add.dynamicBitmapText(0, 0, 'desyrel', 'It\'s cold\noutside ', 64);
      let text2 = this.add.dynamicBitmapText(0, 0, 'hyper', 'PHASER 3', 128);
      //
      text1.setDisplayCallback(this.textCallback);
      text2.setDisplayCallback(this.rainbowCallback);
      // If you down't set the body as active it won't collide with the world bounds
      // Set the Game Object we just created as being bound to this physics body
      this.impact.add.body(200, 100).setGameObject(text1).setLite().setVelocity(-300, 200).setBounce(1);
      this.impact.add.body(100, 300).setGameObject(text2).setLite().setVelocity(300, 200).setBounce(1);
      //
      game._this = this;
    }

    update () {
      this.rainbowColorIdx = 0;
      if (this.delay++ === 6) {
        this.rainbowColorOffset = (this.rainbowColorOffset + 1) % (this.rainbowColor.length);
        this.delay = 0;
      }

    }

    render () {
    }

    rainbowCallback (data) {
      let _this = game._this;
      data.color = _this.rainbowColor[(_this.rainbowColorOffset + _this.rainbowColorIdx) % _this.rainbowColor.length];
      _this.rainbowColorIdx = (_this.rainbowColorIdx + 1) % (_this.rainbowColor.length);
      data.y = Math.cos(_this.rainbowWave + _this.rainbowColorIdx) * 10;
      _this.rainbowWave += 0.01;
      return data;
    }

    textCallback (data) {
      if (data.index >= 5 && data.index <= 8) {
        data.x = Phaser.Math.Between(data.x - 2, data.x + 2);
        data.y = Phaser.Math.Between(data.y - 4, data.y + 4);
      }
      return data;
    }
  }
})();
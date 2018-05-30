(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
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
      this.tween = null;
      this.image = null;
      this.fromColors = null;
      this.toColors = null;
    }

    preload () {
      this.load.image('face', 'assets/pics/bw-face.png');
    }

    create () {
      this.image = this.add.image(400, 300, 'face');
      this.fromColors = this.getRandomVertexColors();
      this.image.setTint(
          this.fromColors.topLeft.color,
          this.fromColors.topRight.color,
          this.fromColors.bottomLeft.color,
          this.fromColors.bottomRight.color
      );
      // Bind the scope to tintTween so we can use this.tweens inside it.
      this.tintTween = this.tintTween.bind(this);
      this.initTweens = this.initTweens.bind(this);
      this.initTweens();
    }

    update () {
    }

    getRandomVertexColors () {
      // Create a random color for each vertex.
      // RandomRGB returns a Phaser.Display.Color object with random RGB values.
      let RandomRGB = Phaser.Display.Color.RandomRGB;
      return {
        topLeft: RandomRGB(),
        topRight: RandomRGB(),
        bottomLeft: RandomRGB(),
        bottomRight: RandomRGB()
      };
    }

    getTintColor (vertex) {
      // Interpolate between the fromColor and toColor of the current vertex,
      // using the current tween value
      let tint = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.fromColors[vertex],
          this.toColors[vertex],
          100,
          this.tween.getValue()
      );
      // Interpolate.ColorWithColor returns a Javascript object with
      // interpolated RGB values. We convert it to a Phaser.Display.Color object
      // in order to get the integer value of the tint color.
      return Phaser.Display.Color.ObjectToColor(tint).color;
    }

    tintTween (fromColors, toColors, callback) {
      this.tween = this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 2000,
        onUpdate: () => {
          this.image.setTint(
              this.getTintColor('topLeft'),
              this.getTintColor('topRight'),
              this.getTintColor('bottomLeft'),
              this.getTintColor('topRight')
          );
        },
        onComplete: callback
      });
    }

    initTweens () {
      this.fromColors = this.toColors || this.fromColors;
      this.toColors = this.getRandomVertexColors();
      this.tintTween(this.fromColors, this.toColors, this.initTweens);
    }

  }
})();
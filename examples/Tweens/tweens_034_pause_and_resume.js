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
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let marker = this.add.image(100, 200, 'block').setAlpha(0.3);
      let image = this.add.image(100, 200, 'block');
      //
      this.text = this.add.text(30, 20, '0', {font: '16px Courier', fill: '#00ff00'});
      //
      this.tween = this.tweens.add({
        targets: image,
        x: 700,
        y: 500,
        duration: 3000,
        ease: 'Power2',
        yoyo: true,
        repeat: -1,
        paused: true
      });
      //
      this.input.on('pointerdown', () => {
        if (this.tween.isPlaying()) {
          this.tween.pause();
        } else {
          this.tween.resume();
        }
      });
    }

    update () {
      // Tween
      this.text.setText([
        'Progress: ' + this.tween.progress,
        'Elapsed: ' + this.tween.elapsed,
        'Duration: ' + this.tween.duration
      ]);
    }
  }
})();
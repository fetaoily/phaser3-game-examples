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
      this.text = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let marker = this.add.image(100, 300, 'block').setAlpha(0.3);
      let image = this.add.image(100, 300, 'block');
      this.text = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });
      // Expected totalDuration = 17500
      this.tween = this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Power1',
        duration: 2000,
        yoyo: true,
        repeat: 1,
        repeatDelay: 500,
        loop: 1,
        loopDelay: 500
      });
    }

    update () {
      // Tween
      this.text.setText([
        'Progress: ' + this.tween.progress,
        'Total Progress: ' + this.tween.totalProgress,
        'Elapsed: ' + this.tween.elapsed,
        'Total Elapsed: ' + this.tween.totalElapsed,
        'Loop: ' + this.tween.loop,
        'LoopDelay: ' + this.tween.loopDelay,
        'Duration: ' + this.tween.duration,
        'Total Duration: ' + this.tween.totalDuration
      ]);
    }
  }
})();
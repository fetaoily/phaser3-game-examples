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
      this.text1 = null;
      this.text2 = null;
      this.tween = null;
      this.progressBar = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let marker = this.add.image(100, 250, 'block').setAlpha(0.3);
      let image = this.add.image(100, 250, 'block');
      //
      this.text1 = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });
      this.text2 = this.add.text(400, 20, '0', { font: '16px Courier', fill: '#00ff00' });
      //
      this.tween = this.tweens.add({
        targets: image,
        props: {
          x: { value: 700, duration: 4000, ease: 'Power2' },
          y: { value: 500, duration: 1500, ease: 'Bounce.easeOut' }
        },
        loop: 2,
        loopDelay: 1000
      });
      console.log(this.tween);
      //
      this.progressBar = document.createElement('input');
      this.progressBar.type = 'range';
      this.progressBar.min = 0;
      this.progressBar.max = 100;
      this.progressBar.step = 0.001;
      this.progressBar.value = 50;
      document.body.appendChild(this.progressBar);
      //
      this.progressBar.addEventListener('input', (e) => {
        this.tween.pause();
        this.tween.seek(e.target.value / 100);
        this.tween.resume();
      });
    }

    update () {
      // Tween
      this.text1.setText([
        'Progress:' + this.tween.progress,
        'Elapsed:' + this.tween.elapsed,
        'Duration:' + this.tween.duration,
        ' ',
        'Loops:' + this.tween.loopCounter,
        'TProgress:' + this.tween.totalProgress,
        'TElapsed:' + this.tween.totalElapsed,
        'TDuration:' + this.tween.totalDuration
      ]);
      // TweenData
      this.text2.setText([
        'Progress A:' + this.tween.data[0].progress,
        'Progress B:' + this.tween.data[1].progress
      ]);
      //
      if (this.tween.isPlaying()) {
        this.progressBar.value = Math.floor(this.tween.progress * 100);
      }
    }
  }
})();
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
      this.arrow = null;
      this.tween = null;
      this.text = null;
    }

    preload () {
      this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create () {
      this.text = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });
      this.arrow = this.add.image(400, 300, 'arrow');
      this.tween = this.tweens.add({
        targets: this.arrow,
        x: 400, y: 300,
        ease: 'Sine.easeIn',
        duration: 3000,
        paused: true
      });
      this.input.on('pointerdown', () => {
        this.tween.play();
      });
    }

    update () {
      this.arrow.rotation = Math.atan2(this.input.y - this.arrow.y, this.input.x - this.arrow.x);
      if (this.tween.isPlaying()) {
        this.tween.updateTo('x', this.input.x, true);
        this.tween.updateTo('y', this.input.y, true);
        this.text.setText('Progress: ' + this.tween.progress);
      } else {
        this.text.setText('Click to start');
      }
    }
  }
})();
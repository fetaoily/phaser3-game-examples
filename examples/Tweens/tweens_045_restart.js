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
      this.arrow = this.add.image(100, 300, 'arrow');
      this.tween = this.tweens.add({
        targets: this.arrow,
        x: 700,
        y: 300,
        ease: 'Linear',
        duration: 2000
      });
      this.input.on('pointerdown', () => {
        this.tween.restart();
      });
    }

    update () {
      if (this.tween.isPlaying()) {
        this.text.setText('Progress: ' + this.tween.progress);
      } else {
        this.text.setText('Click to restart: ' + this.tween.state);
      }
    }
  }
})();
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
      this.load.image('bg', 'assets/ui/undersea-bg.png');
      this.load.image('up', 'assets/ui/up-bubble.png');
      this.load.image('down', 'assets/ui/down-bubble.png');
      this.load.spritesheet('fish', 'assets/sprites/fish-136x80.png', { frameWidth: 136, frameHeight: 80 });
    }

    create () {
      this.add.image(400, 300, 'bg');
      //
      let image1 = this.add.image(100, 100, 'fish', 0);
      let image2 = this.add.image(100, 180, 'fish', 1);
      let image3 = this.add.image(100, 280, 'fish', 2);
      let image4 = this.add.image(100, 380, 'fish', 3);
      let image5 = this.add.image(100, 480, 'fish', 4);
      //
      let tween = this.tweens.add({
        targets: [image1, image2, image3, image4, image5],
        x: 700,
        duration: 2000,
        ease: 'Sine.easeInOut',
        flipX: true,
        yoyo: true,
        repeat: -1,
        delay (i, total, target) {
          return i * 500;
        }
      });
      // Buttons to control the Tween timescale
      let text = this.add.text(250, 0, 'timeScale :1 ').setFont('32px Airal Black').setFill('#ffffff').setShadow(2, 2, '#333333', 2);
      let downButton = this.add.image(70, 530, 'down').setInteractive();
      let upButton = this.add.image(730, 530, 'up').setInteractive();
      //
      this.input.on('gameobjectup', (pointer, gameObject) => {
        if (gameObject === downButton && tween.timeScale > 0) {
          tween.timeScale -= 0.1;
        } else if (gameObject === upButton && tween.timeScale < 9.9) {
          tween.timeScale += 0.1;
        }
        text.setText('timeScale:' + tween.timeScale.toFixed(2));
      });
    }

    update () {
    }
  }
})();
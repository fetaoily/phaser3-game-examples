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
      this.scene = null;
      this.addFlag = false;
      this.blitter = null;
      this.idx = 1;
      this.frame = 'veg01';
      this.numbers = [];
    }

    preload () {
      this.load.atlas('atlas', 'assets/tests/fruit/veg.png', 'assets/tests/fruit/veg.json');
    }

    create () {
      this.scene = this;
      //
      this.numbers.push(this.add.image(0 * 48, 720, 'atlas', '0').setOrigin(0));
      this.numbers.push(this.add.image(1 * 48, 720, 'atlas', '0').setOrigin(0));
      this.numbers.push(this.add.image(2 * 48, 720, 'atlas', '0').setOrigin(0));
      this.numbers.push(this.add.image(3 * 48, 720, 'atlas', '0').setOrigin(0));
      this.numbers.push(this.add.image(4 * 48, 720, 'atlas', '0').setOrigin(0));
      this.numbers.push(this.add.image(5 * 48, 720, 'atlas', '0').setOrigin(0));
      //
      this.blitter = this.add.blitter(0, 0, 'atlas');
      //
      this.updateDigits();
      //
      this.input.on('pointerdown', () => {
        this.addFlag = true;
      });
      this.input.on('pointerup', () => {
        this.addFlag = false;
      });
    }

    update () {
      if (this.addFlag) {
        for (let i = 0; i < 32; i++) {
          this.launch(i);
        }
        this.updateDigits();
      }
    }

    launch (i) {
      this.idx++;
      if (this.idx === 38) {
        this.idx = 1;
      }
      if (this.idx < 10) {
        this.frame = 'veg0' + this.idx.toString();
      } else {
        this.frame = 'veg' + this.idx.toString();
      }
      //
      let bob = this.blitter.create(i * 32, 0, this.frame);
      //
      this.scene.tweens.add({
        targets: bob,
        y: 650,
        delay: Math.random() * 2,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
      });
    }

    updateDigits () {
      let len = Phaser.Utils.String.Pad(this.blitter.children.length.toString(), 6, '0', 1);

      this.numbers[0].setFrame(len[0]);
      this.numbers[1].setFrame(len[1]);
      this.numbers[2].setFrame(len[2]);
      this.numbers[3].setFrame(len[3]);
      this.numbers[4].setFrame(len[4]);
      this.numbers[5].setFrame(len[5]);
    }
  }
})();
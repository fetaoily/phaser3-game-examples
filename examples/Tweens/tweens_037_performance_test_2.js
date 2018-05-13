(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    gameConfig = this.gameConfig = gameConfig = {
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
      this.x = 0;
      this.i = 0;
      this.blitter = null;
      this.text = null;
    }

    preload () {
      this.load.spritesheet('balls', 'assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 });
    }

    // This test will create lots of single-fire tweens and not re-use the, to test Tween Manager GC
    create () {
      this.scene = this;
      this.blitter = this.add.blitter(0, 0, 'balls');
      this.text = this.add.text(10, 720);
      this.time.addEvent({ delay: 10, callback: this.launch, callbackScope: this, repeat: 10000 });
    }

    update () {
    }

    launch () {
      this.i++;
      let bob = this.blitter.create(this.x, 700, Phaser.Math.Between(0, 5));
      this.x += 2;
      if (this.x > 1024) {
        this.x = 0;
      }
      this.text.setText('Active Tweens:' + this.tweens._active.length + '\nTotal Tweens created: ' + this.i);
      //
      this.tweens.add({
        targets: bob,
        y: 10,
        duration: Phaser.Math.Between(500, 1000),
        ease: 'Power1',
        yoyo: true,
        onComplete () {
          bob.destroy();
        }
      })

    }
  }

})();
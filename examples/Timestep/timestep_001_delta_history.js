(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      useTicker: true,
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
      this.image = null;
      this.time = null;
      this.delta = null;
      this.speed = (600 / 2) / 1000;
    }

    preload () {
      this.load.image('bunny', 'assets/sprites/bunny.png');
      this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
    }

    create () {
      this.delta = this.add.text(32, 32);
      this.time = this.add.text(500, 400);
      //
      this.image = this.add.image(0, 200, 'bunny');
      //
      this.anims.create({
        key: 'diamond',
        frames: this.anims.generateFrameNames('gems', {prefix: 'diamond_', end: 15, zeroPad: 4}),
        repeat: -1
      });
      this.anims.create({
        key: 'prism',
        frames: this.anims.generateFrameNames('gems', {prefix: 'prism_', end: 6, zeroPad: 4}),
        repeat: -1
      });
      this.anims.create({
        key: 'ruby',
        frames: this.anims.generateFrameNames('gems', {prefix: 'ruby_', end: 6, zeroPad: 4}),
        repeat: -1
      });
      this.anims.create({
        key: 'square',
        frames: this.anims.generateFrameNames('gems', {prefix: 'square_', end: 14, zeroPad: 4}),
        repeat: -1
      });
      //
      this.add.sprite(400, 100, 'gems').play('diamond');
      this.add.sprite(400, 200, 'gems').play('prism');
      this.add.sprite(400, 300, 'gems').play('ruby');
      this.add.sprite(400, 400, 'gems').play('square');
    }

    update (time, delta) {
      this.image.x += this.speed * delta;
      if (this.image.x > 1000) {
        this.image.x = 0;
      }
      //
      this.time.setText('time: ' + this.sys.game.loop.time.toString());
      //
      this.delta.setText(this.sys.game.loop.deltaHistory);
    }
  }
})();
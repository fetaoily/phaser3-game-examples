(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 100},
          debug: false
        }
      },
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
      this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
    }

    create () {
      //
      this.physics.world.setBounds(0, 0, 800 * 32, 600 * 32);
      //
      let spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -100, -100);
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
      // Create loads of random sprites
      let anims = ['diamond', 'prism', 'ruby', 'square'];
      for (let i = 0; i < 10000; i++) {
        let pos = Phaser.Geom.Rectangle.Random(spriteBounds);
        let block = this.physics.add.sprite(pos.x, pos.y, 'gems');
        //
        block.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
        block.setBounce(1).setCollideWorldBounds(true);
        //
        if (Math.random() > 0.5) {
          block.body.velocity.x *= -1;
        } else {
          block.body.velocity.y *= -1;
        }
        //
        block.play(Phaser.Math.RND.pick(anims));
      }
      //
      let cursors = this.input.keyboard.createCursorKeys();
      let controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
      //
      this.add.text(0, 0, 'Use Cursors to scroll camera.\n Q / E to zoom in and out', {
        font: '18px Courier',
        fill: '#00ff00'
      });
    }

    update (time, delta) {
      this.controls.update(delta);
    }

    render () {
    }
  }
})();
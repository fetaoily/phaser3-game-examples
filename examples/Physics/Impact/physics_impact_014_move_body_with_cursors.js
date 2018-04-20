(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          gravity: 800
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
      this.player = null;
      this.cursors = null;
    }

    preload () {
      this.load.spritesheet('dude', 'assets/sprites/dude.png', {frameWidth: 32, frameHeight: 48});
      this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}]
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
      });
      this.impact.world.setBounds();
      // A few platforms
      this.impact.add.image(200, 300, 'platform').setFixed().setGravity(0).setBodyScale(0.5);
      this.impact.add.image(550, 190, 'platform').setFixed().setGravity(0).setBodyScale(0.4);
      this.impact.add.image(900, 300, 'platform').setFixed().setGravity(0).setBodyScale(0.5);
      this.impact.add.image(800, 400, 'platform').setFixed().setGravity(0).setBodyScale(0.5);
      this.impact.add.image(700, 500, 'platform').setFixed().setGravity(0).setBodyScale(0.5);
      //
      // Our sprite
      this.player = this.impact.add.sprite(200, 200, 'dude', 4).setOrigin(0, 0.15);
      //
      this.player.setActive();
      this.player.setMaxVelocity(500);
      this.player.setFriction(1000, 100);
      //
      this.player.body.accelGround = 12000;
      this.player.body.accelAir = 600;
      this.player.body.jumpSpeed = 500;
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
      let accel = this.player.body.standing ? this.player.body.accelGround : this.player.body.accelAir;
      if (this.cursors.left.isDown) {
        this.player.setAccelerationX(-accel);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setAccelerationX(accel);
        this.player.anims.play('right', true);
      } else {
        this.player.setAccelerationX(0);
      }
      //
      if (this.player.vel.x === 0) {
        this.player.anims.play('turn');
      }
      //
      if (this.cursors.up.isDown && this.player.body.standing) {
        this.player.setVelocityY(-this.player.body.jumpSpeed);
      }
    }

    render () {
    }
  }
})();
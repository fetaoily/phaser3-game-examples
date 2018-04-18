(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
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
      this.bg = null;
      this.starts = null;
      this.ship = null;
      this.bullets = null;
      this.lastFired = 0;
      this.cursors = null;
      this.fire = null;
    }

    preload () {
      this.load.image('background', 'assets/tests/space/nebula.jpg');
      this.load.image('stars', 'assets/tests/space/stars.png');
      this.load.atlas('space', 'assets/tests/space/space.png', 'assets/tests/space/space.json');
    }

    create () {
      // Prepare some spritesheets and animations
      this.textures.addSpriteSheetFromAtlas('mine-sheet', {atlas: 'space', frame: 'mine', frameWidth: 64});
      this.textures.addSpriteSheetFromAtlas('asteroid1-sheet', {atlas: 'space', frame: 'asteroid1', frameWidth: 96});
      this.textures.addSpriteSheetFromAtlas('asteroid2-sheet', {atlas: 'space', frame: 'asteroid2', frameWidth: 96});
      this.textures.addSpriteSheetFromAtlas('asteroid3-sheet', {atlas: 'space', frame: 'asteroid3', frameWidth: 96});
      this.textures.addSpriteSheetFromAtlas('asteroid4-sheet', {atlas: 'space', frame: 'asteroid4', frameWidth: 64});
      //
      this.anims.create({
        key: 'mine-anim',
        frames: this.anims.generateFrameNumbers('mine-sheet', {start: 0, end: 15}),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: 'asteroid1-anim',
        frames: this.anims.generateFrameNumbers('asteroid1-sheet', {start: 0, end: 24}),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: 'asteroid2-anim',
        frames: this.anims.generateFrameNumbers('asteroid2-sheet', {start: 0, end: 24}),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: 'asteroid3-anim',
        frames: this.anims.generateFrameNumbers('asteroid3-sheet', {start: 0, end: 24}),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: 'asteroid4-anim',
        frames: this.anims.generateFrameNumbers('asteroid4-sheet', {start: 0, end: 24}),
        frameRate: 20,
        repeat: -1
      });
      //
      // World size is 8000 x 6000
      this.bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);
      // Add our planets, etc
      this.add.image(512, 680, 'space', 'blue-planet').setScrollFactor(0.6);
      this.add.image(2833, 1246, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6);
      this.add.image(3875, 531, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
      //
      let galaxy = this.add.image(5345 + 1024, 327 + 1024, 'space', 'galaxy').setBlendMode(1).setScrollFactor(0.6);
      //
      this.add.image(908, 3922, 'space', 'gas-giant').setOrigin(0).setScrollFactor(0.6);
      this.add.image(3140, 2974, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6).setScale(0.8).setTint(0x882d2d);
      this.add.image(6052, 4280, 'space', 'purple-planet').setOrigin(0).setScrollFactor(0.6);
      //
      for (let i = 0; i < 8; i++) {
        this.add.image(Phaser.Math.Between(0, 8000), Phaser.Math.Between(0, 6000), 'space', 'eyes').setBlendMode(1).setScrollFactor(0.8);
      }
      //
      this.starts = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);
      //
      let particles = this.add.particles('space');
      let emitter = particles.createEmitter({
        frame: 'blue',
        speed: 100,
        lifeSpan: {
          onEmit: (particles, key, t, value) => {
            return Phaser.Math.Percent(this.ship.body.speed, 0, 300) * 2000;
          }
        },
        alpha: {
          onEmit: (particle, key, t, value) => {
            return Phaser.Math.Percent(this.ship.body.speed, 0, 300);
          }
        },
        angle: {
          onEmit: (particle, key, t, value) => {
            let v = Phaser.Math.Between(-10, 10);
            return (this.ship.angle - 180) + v;
          }
        },
        scale: {
          start: 0.6, end: 0
        },
        blendMode: 'ADD'
      });
      //
      this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
      });
      //
      this.ship = this.physics.add.image(4000, 3000, 'space', 'ship').setDepth(2);
      this.ship.setDrag(300);
      this.ship.setAngularDrag(400);
      this.ship.setMaxVelocity(600);
      //
      emitter.startFollow(this.ship);
      //
      this.cameras.main.startFollow(this.ship);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      //
      this.add.sprite(4500, 3000).play('asteroid4-anim');
      //
      this.tweens.add({
        targets: galaxy,
        angle: 360,
        duration: 100000,
        ease: 'Linear',
        loop: -1
      })
    }

    update (time, delta) {
      if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-150);
      } else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(150);
      } else {
        this.ship.setAngularVelocity(0);
      }
      //
      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.ship.rotation, 600, this.ship.body.acceleration);
      } else {
        this.ship.setAcceleration(0);
      }
      //
      if (this.fire.isDown && time > this.lastFired) {
        let bullet = this.bullets.get();
        if (bullet) {
          bullet.fire(this.ship);
          this.lastFired = time + 100;
        }
      }
      //
      this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
      this.bg.tilePositionY += this.ship.body.deltaX() * 0.5;
      //
      this.starts.tilePositionX += this.ship.body.deltaX() * 2;
      this.starts.tilePositionY += this.ship.body.deltaY() * 2;

    }

    render () {
    }
  }

  class Bullet extends Phaser.Physics.Arcade.Image {
    constructor (scene) {
      super(scene, 0, 0, 'space', 'blaster');
      this.setBlendMode(1);
      this.setDepth(1);
      this.speed = 1000;
      this.lifeSpan = 1000;
      this._temp = new Phaser.Math.Vector2();
    }

    update (time, delta) {
      this.lifeSpan -= delta;
      if (this.lifeSpan <= 0) {
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
      }
    }

    fire (ship) {
      this.lifeSpan = 1000;
      //
      this.setActive(true);
      this.setVisible(true);
      this.setRotation(ship.rotation);
      this.setAngle(ship.body.rotation);
      this.setPosition(ship.x, ship.y);
      this.body.reset(ship.x, ship.y);
      //
      ship.body.advancePosition(10, this._temp);
      this.setPosition(this._temp.x, this._temp.y);
      this.body.reset(this._temp.x, this._temp.y);
      // if ship is rotating we need to add it here
      let a = ship.body.angularVelocity;
      let angle = 0;
      if (ship.body.speed !== 0) {
        angle = Math.atan2(ship.body.velocity.y, ship.body.velocity.x);
      } else {
        angle = Phaser.Math.DegToRad(ship.body.rotation);
      }
      //
      // this.body.world.velocityFromRotation(angle,this.speed+ship.body.speed,this.body.velocity);
      this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
      //
      this.body.velocity.x *= 2;
      this.body.velocity.y *= 2;
    }
  }
})();
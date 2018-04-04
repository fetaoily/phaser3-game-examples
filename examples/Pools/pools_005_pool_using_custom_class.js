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
      this.bullets = null;
      this.ship = null;
      this.info = null;
      this.speed = null;
      this.stats = null;
      this.cursors = null;
      this.lastFired = 0;
    }

    preload () {
      this.load.image('ship', 'assets/sprites/ship.png');
      this.load.image('bullet', 'assets/sprites/bullet.png');
    }

    create () {
      // A sample custom class with its own 'update' and 'fire' methods
      this.info = this.add.text(32, 32, 'Click to add objects', {fill: '#00ff00'});
      // Set the custom class type that this Group will create.
      // Limited to just 10 objects in the poll, not allowed to grow beyond it.
      // runChildUpdate tells the Group to call 'update' on any active child. The default is false.
      this.bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
      });
      //
      this.ship = this.add.sprite(400, 500, 'ship').setDepth(1);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.speed = Phaser.Math.GetSpeed(300, 1);
    }

    update (time, delta) {
      if (this.cursors.left.isDown) {
        this.ship.x -= this.speed * delta;
      } else if (this.cursors.right.isDown) {
        this.ship.x += this.speed * delta;
      }
      //
      if (this.cursors.up.isDown && time > this.lastFired) {
        let bullet = this.bullets.get();
        if (bullet) {
          bullet.fire(this.ship.x, this.ship.y);
          this.lastFired = time + 50;
        }
      }
      //
      this.info.setText([
        'Used: ' + this.bullets.getTotalUsed(),
        'Free: ' + this.bullets.getTotalFree()
      ])
    }

    render () {
    }
  }

  class Bullet extends Phaser.GameObjects.Image {
    constructor (scene) {
      super(scene, 0, 0, 'bullet');
      this.speed = Phaser.Math.GetSpeed(500, 1);
    }

    fire (x, y) {
      this.setPosition(x, y - 50);
      this.setActive(true);
      this.setVisible(true);
    }

    update (time, delta) {
      this.y -= this.speed * delta;
      if (this.y < -50) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }
})();
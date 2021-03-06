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
      this.bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
      });
      //
      this.ship = this.add.sprite(400, 500, 'ship').setDepth(1);
      this.cursors = this.input.keyboard.createCursorKeys();
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
    }

    render () {
    }
  }

  class Bullet extends Phaser.GameObjects.Image {
    constructor (scene) {
      super(scene, 0, 0, 'bullet');
      this.speed = Phaser.Math.GetSpeed(400, 1);
    }

    preload () {
    }

    update (time, delta) {
      this.y -= this.speed * delta;
      if (this.y < -50) {
        this.setActive(false);
        this.setVisible(false);
      }
    }

    fire (x, y) {
      this.setPosition(x, y - 50);
      this.setActive(true);
      this.setVisible(true);
    }
  }
})();
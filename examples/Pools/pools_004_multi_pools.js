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
      this.bullets1 = null;
      this.bullets2 = null;
      this.ship = null;
      this.speed = null;
      this.stats = null;
      this.lastFired = 0;
      this.isDown = false;
      this.mouseX = 0;
      this.mouseY = 0;
    }

    preload () {
      this.load.image('ship', 'assets/sprites/ship.png');
      this.load.image('bullet1', 'assets/sprites/bullets/bullet11.png');
    }

    create () {
      this.bullets = this.add.group({
        classType: Bullet,
        maxSize: 50,
        runChildUpdate: true
      });
      //
      this.input.on('pointerdown', (pointer) => {
        this.isDown = true;
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
      });
      //
      this.input.on('pointermove', (pointer) => {
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
      });
      //
      this.input.on('pointerup', (pointer) => {
        this.isDown = false;
      });
    }

    update (time, delta) {
      if (this.isDown && time > this.lastFired) {
        let bullet = this.bullets.get();
        if (bullet) {
          bullet.fire(this.mouseX, this.mouseY);
          this.lastFired = time + 50;
        }
      }
    }

    render () {
    }
  }

  class Bullet extends Phaser.GameObjects.Image {
    constructor (scene) {
      super(scene, 0, 0, 'bullet1');
      this.incX = 0;
      this.incY = 0;
      this.lifeSpan = 0;
      this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire (x, y) {
      this.setActive(true);
      this.setVisible(true);
      // Bullets fire from the middle of the screen to the given x/y
      this.setPosition(400, 300);
      //
      let angle = Phaser.Math.Angle.Between(x, y, 400, 300);
      this.setRotation(angle);
      //
      this.incX = Math.cos(angle);
      this.incY = Math.sin(angle);
      //
      this.lifeSpan = 1000;
    }

    update (time, delta) {
      this.lifeSpan -= delta;
      //
      this.x -= this.incX * (this.speed * delta);
      this.y -= this.incY * (this.speed * delta);
      //
      if (this.lifeSpan <= 0) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }
})();
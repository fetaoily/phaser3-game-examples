(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          setBounds: {
            x: 0,
            y: 0,
            width: 3200,
            height: 600,
            thickness: 32
          }
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
      this.load.image('ship', 'assets/sprites/shmup-ship2.png');
    }

    create () {
      // The world is 3200 x 600 in size
      this.cameras.main.setBounds(0, 0, 3200, 600);
      //
      this.createLandscape();
      // Add a player ship
      this.player = this.impact.add.sprite(1600, 200, 'ship');
      this.player.setMaxVelocity(1000).setFriction(400, 200).setPassive();
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.player.setAccelerationX(-800);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.setAccelerationX(800);
        this.player.flipX = false;
      } else {
        this.player.setAccelerationX(0);
      }
      //
      if (this.cursors.up.isDown) {
        this.player.setAccelerationY(-800);
      } else if (this.cursors.down.isDown) {
        this.player.setAccelerationY(800);
      } else {
        this.player.setAccelerationY(0);
      }
      //
      // Position the center of the camera on the player
      // We -400 because the camera width is 800px and
      // we want the center of the camera on the player, not the left-hand side of it
      this.cameras.main.scrollX = this.player.x - 400;
    }

    render () {
    }

    createLandscape () {
      // Draw a random 'landscape'
      let landscape = this.add.graphics();
      landscape.fillStyle(0x008800, 1);
      landscape.lineStyle(2, 0x00ff00, 1);
      landscape.beginPath();
      //
      let maxY = 550;
      let minY = 400;

      let x = 0;
      let y = maxY;
      let range = 0;

      let up = true;
      //
      landscape.moveTo(0, 600);
      landscape.lineTo(0, 550);
      //
      do {
        // How large is this 'side' of the mountain?
        range = Phaser.Math.Between(20, 100);
        if (up) {
          y = Phaser.Math.Between(y, minY);
          up = false;
        } else {
          y = Phaser.Math.Between(y, maxY);
          up = true;
        }

        landscape.lineTo(x + range, y);
        x += range;
      } while (x < 3100);
      landscape.lineTo(3200, maxY);
      landscape.lineTo(3200, 600);
      landscape.closePath();
      //
      landscape.strokePath();
      landscape.fillPath();
    }
  }
})();
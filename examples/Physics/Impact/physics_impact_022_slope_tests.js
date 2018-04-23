(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          gravity: 200
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
      this.load.image('tiles', 'assets/tilemaps/tiles/slopes32mud.png');
      this.load.image('player', 'assets/sprites/phaser-dude.png');
      // A standard Weltmeister map with two layers: 'map' & 'collision'
      this.load.tilemapWeltmeister('map', 'assets/tilemaps/maps/impact3.json');
    }

    create () {
      let map = this.make.tilemap({key: 'map'});
      // Name of tileset from Weltmeister map , name of image in Phaser cache
      let tileset = map.addTilesetImage('media/tiles.png', 'tiles');
      //
      map.createBlankDynamicLayer('background', tileset).fill(0).setAlpha(0.3);
      // Name of layer from Weltmeister, tileset, x, y
      let layer = map.createStaticLayer('map', tileset, 0, 0);
      // This will pull in the 'collision' layer from the associated map
      this.impact.world.setCollisionMap('map');
      //
      this.player = this.impact.add.image(64, 300, 'player');
      this.player.setMaxVelocity(500, 400).setFriction(800, 0);
      this.player.body.accelGround = 1200;
      this.player.body.accelAir = 600;
      this.player.body.jumpSpeed = 1000;
      //
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      let help = this.add.text(16, 16, 'Arrow keys to move. Press "up" to jump.', {
        fontSize: '18px',
        fill: '#ffffff'
      });
      help.setScrollFactor(0);

    }

    update (time, delta) {
      let accel = this.player.standing ? this.player.body.accelGround : this.player.body.accelAir;
      if (this.cursors.left.isDown) {
        this.player.setAccelerationX(-accel);
      } else if (this.cursors.right.isDown) {
        this.player.setAccelerationX(accel);
      } else {
        this.player.setAccelerationX(0);
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
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
          gravity: 700
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
      this.load.image('clown', 'assets/sprites/clown.png');
      this.load.json('map', 'assets/tilemaps/maps/impact2.json');
      this.load.image('tiles', 'assets/tilemaps/tiles/slopes32.png');
    }

    create () {
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      let impactData = this.cache.json.get('map').layer[0];
      //
      let mapData = [];
      // Build a single array from the data
      impactData.data.forEach((row, index, array) => {
        row.forEach((tile) => {
          if (tile === 0) {
            tile = 47;
          }
          mapData.push(tile - 1);
        });
      });
      window.add = this.add
      //
      // this.add.staticTilemap(mapData, 0, 0, impactData.tilesize, impactData.tilesize, impactData.width, impactData.height, 0, 'tiles');
      this.impact.world.setCollisionMap(impactData.tilesize, impactData.data);
      //
      this.player = this.impact.add.image(64, 300, 'clown');
      //
      this.player.setMaxVelocity(500).setFriction(1000, 100);
      //
      this.player.body.accelGround = 1200;
      this.player.body.accelAir = 600;
      this.player.body.jumpSpeed = 500;
      //
    }

    update (tile,delta) {
      let accel = this.player.body.standing?this.player.body.accelGround:this.player.body.accelAir;
      //
      if (this.cursors.left.isDown){
        this.player.setAccelerationX(-accel);
      } else if (this.cursors.right.isDown){
        this.player.setAccelerationX(accel);
      } else {
        this.player.setAccelerationX(0);
      }
      //
      if (this.cursors.up.isDown&&this.player.body.standing){
        this.player.setVelocity(-this.player.body.jumpSpeed);
      }

    }

    render () {
    }
  }
})();
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
          maxVelocity: 500
        }
      },
      scene: [PlayGame]
    };
    this.game = game = new NewGame(this.gameConfig)
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor () {
      super();
      this.iter = {x: 0, y: 0};
      this.tilesprite = null;
    }

    preload () {
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create a Tile Sprite object
      this.tilesprite = this.add.tileSprite(400, 300, 128 * 2, 128 * 2, 'mushroom');
      // If you don't set the body as active it won't collide with the world bounds
      // Set the Game Object we just created as being bound t othis physics body
      let body = this.impact.add.body(200, 100).setGameObject(this.tilesprite).setActive().setVelocity(300, 150).setBounce(1);
      //
      body.setCollideCallback(this.collide, this);
    }

    update () {
      this.tilesprite.tilePositionX += this.iter.x;
      this.tilesprite.tilePositionY += this.iter.y;

    }

    render () {
    }

    collide (body, wall, axis) {
      switch (wall.name) {
        case  'left':
          this.iter.x = -2;
          break;
        case 'right':
          this.iter.x = 2;
          break;
        case 'top':
          this.iter.y = -2;
          break;
        case 'bottom':
          this.iter.y = 2;
          break;
      }
    }

  }
})();
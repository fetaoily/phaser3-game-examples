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
      this.sprite = null;
      this.group = null;
    }

    preload () {
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      this.sprite = this.physics.add.image(400, 300, 'mushroom');
      this.group = this.physics.add.group({
        key: 'ball',
        frameQuantity: 30,
        immovable: true
      });
      //
      Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), new Phaser.Geom.Rectangle(84, 84, 616, 416));
      //
      this.sprite.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true).setGravity(200);
    }

    update () {
      this.physics.world.collide(this.sprite, this.group);
    }

    render () {
    }
  }
})();
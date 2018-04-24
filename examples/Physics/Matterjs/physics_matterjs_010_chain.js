(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
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
      this.block = null;
      this.cursors = null;
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      this.block = this.matter.add.image(400, 50, 'block', null, {ignoreGravity: true});
      this.block.setFixedRotation();
      this.block.setMass(500);
      //
      let y = 150;
      let prev = this.block;
      for (let i = 0; i < 12; i++) {
        let ball = this.matter.add.image(400, y, 'ball', null, {shape: 'circle', mass: 0.1});
        this.matter.add.joint(prev, ball, (i === 0) ? 90 : 35, 0.4);
        prev = ball;
        y += 18;
      }
      //
      this.matter.add.mouseSpring();
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
      if (this.cursors.left.isDown) {
        this.block.setVelocityX(-20);
      } else if (this.cursors.right.isDown) {
        this.block.setVelocityX(20);
      } else {
        this.block.setVelocityX(0);
      }
      //
      if (this.cursors.up.isDown) {
        this.block.setVelocityY(-20);
      } else if (this.cursors.down.isDown) {
        this.block.setVelocityY(20);
      } else {
        this.block.setVelocityY(0);
      }
    }

    render () {
    }
  }
})();
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
      this.path = null;
      this.graphics = null;
      this.followers = null;
    }

    preload () {
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      this.graphics = this.add.graphics();
      // Create the zig-zag path
      this.path = new Phaser.Curves.Path(100, -50);
      //
      this.path.lineTo(100, 50);
      //
      let max = 8;
      let h = 500 / max;
      for (let i = 0; i < max; i++) {
        if (i % 2 === 0) {
          this.path.lineTo(700, 50 + h * (i + 1));
        } else {
          this.path.lineTo(100, 50 + h * (i + 1));
        }
      }
      //
      this.path.lineTo(100, 650);
      // Create the path followers
      this.followers = this.add.group();
      //
      for (let i = 0; i < 32; i++) {
        let ball = this.followers.create(0, -50, 'ball');
        // ball.data.set('vector', new Phaser.Math.Vector2());
        ball.vector = new Phaser.Math.Vector2();
        //
        this.tweens.add({
          targets: ball,
          z: 1,
          ease: 'Linear',
          duration: 12000,
          repeat: -1,
          delay: i * 100
        });
      }
    }

    update () {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffffff, 1);
      this.path.draw(this.graphics);
      //
      let balls = this.followers.getChildren();
      //
      for (let i = 0; i < balls.length; i++) {
        let t = balls[i].z;
        // let vec = balls[i].data.get('vector');
        let vec = balls[i].vector;
        // The vector is updated in-place
        this.path.getPoint(t, vec);
        //
        balls[i].setPosition(vec.x, vec.y);
        balls[i].setDepth(balls[i].y);
      }
    }

    render () {
    }
  }
})();
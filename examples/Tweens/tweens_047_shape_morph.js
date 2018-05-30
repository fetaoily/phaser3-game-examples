(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: { debug: true }
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
      this.load.image('ball', 'assets/sprites/blue_ball.png');
    }

    create () {
      let balls = this.add.group({ key: 'ball', repeat: 59 });
      let circle = new Phaser.Geom.Circle(400, 300, 160);
      let triangle = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);
      let rect = new Phaser.Geom.Rectangle(200, 150, 400, 300);
      let ellipse = new Phaser.Geom.Ellipse(400, 300, 200, 500);
      let triangle2 = new Phaser.Geom.Triangle.BuildEquilateral(400, 200, 300);
      // Store the position data for each shape:
      // balls.placeOnCircle(circle);
      //
      Phaser.Actions.PlaceOnCircle(balls.getChildren(), circle);
      balls.children.iterate((child) => {
        // child.data.set('circle', { x: child.x, y: child.y });
        child.setData('circle', { x: child.x, y: child.y });
      });
      //
      Phaser.Actions.PlaceOnTriangle(balls.getChildren(), triangle);
      balls.children.iterate((child) => {
        child.setData('triangle', { x: child.x, y: child.y });
      });
      //
      Phaser.Actions.PlaceOnRectangle(balls.getChildren(), rect);
      balls.children.iterate((child) => {
        child.setData('rect', { x: child.x, y: child.y });
      });
      //
      Phaser.Actions.PlaceOnEllipse(balls.getChildren(), ellipse);
      balls.children.iterate((child) => {
        child.setData('ellipse', { x: child.x, y: child.y });
      });
      //
      Phaser.Actions.PlaceOnTriangle(balls.getChildren(), triangle2);
      balls.children.iterate((child) => {
        child.setData('triangle2', { x: child.x, y: child.y });
      });
      //
      let shapes = ['circle', 'triangle', 'rect', 'ellipse', 'triangle2'];
      let shape1 = 0;
      let shape2 = 0;
      //
      this.tweens.add({
        targets: balls.getChildren(),
        ease: 'Quintic.easeInOut',
        duration: 1000,
        delay: 1000,
        hold: 1000,
        loop: -1,
        x: {
          getEnd (target, key, value) {
            return target.getData(shapes[shape2]).x;
          },
          getStart (target, key, value) {
            return target.getData(shapes[shape1]).x;
          }
        },
        y: {
          getEnd (target, key, value) {
            return target.getData(shapes[shape2]).y;
          },
          getStart (target, key, value) {
            return target.getData(shapes[shape1]).y;
          }
        },
        onLoop () {
          shape1 = Phaser.Math.Wrap(shape1 + 1, 0, 5);
          shape2 = Phaser.Math.Wrap(shape2 + 1, 0, 5);
        }
      })
    }

    update () {
    }
  }
})();
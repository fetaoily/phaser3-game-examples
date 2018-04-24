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
    }

    preload () {
      this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create () {
      //
      this.matter.world.setBounds();
      // Our two bodies which will be connected by a constraint (aka a Joint or Spring)
      let ballA = this.matter.add.image(420, 100, 'ball', null, {shape: 'circle', friction: 0.005, restitution: 0.6});
      let ballB = this.matter.add.image(400, 200, 'ball', null, {shape: 'circle', friction: 0.005, restitution: 0.6});
      let ballC = this.matter.add.image(500, 300, 'ball', null, {shape: 'circle', friction: 0.005, restitution: 0.6});
      let ballD = this.matter.add.image(600, 400, 'ball', null, {shape: 'circle', friction: 0.005, restitution: 0.6});
      // You can create a constraint between the two bodies using a Factory function.
      // The value 100 is the resting length and 0.2 is the stiffness of the constraint.
      //
      this.matter.add.constraint(ballA, ballB, 100, 0.2);
      this.matter.add.constraint(ballB, ballC, 100, 0.2);
      this.matter.add.constraint(ballC, ballD, 100, 0.2);
      this.matter.add.constraint(ballB, ballD, 100, 0.2);
      //
      // To help those of you more used to hte Box2D syntax you can use
      // add.joint or add.spring instead (with the exact same parameters)
      // this.matter.add.spring(ballA, ballB, 100, 0.2);
      // this.matter.add.joint(ballA, ballB, 100, 0.2);
      //
      // // Or you can create a native Matter constraint:
      // let constraint = Phaser.Physics.Matter.Constraint.create({
      //   bodyA: ballA.body,
      //   bodyB: ballB.body,
      //   length: 100,
      //   stiffness: 0.2
      // });
      // // Which you then have to add to the world yourself:
      // this.matter.collideWorldBounds.add(constraint);
      //
      this.matter.add.mouseSpring();
    }

    update () {
    }

    render () {
    }
  }
})();
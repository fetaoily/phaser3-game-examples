(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            y: 0.8
          },
          debugBodyColor: 0xffffff
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
    }

    create () {
      this.matter.world.setBounds();
      this.matter.add.mouseSpring();
      //
      let group = this.matter.world.nextGroup(true);
      //
      let bridge = this.matter.add.stack(160, 290, 15, 1, 0, 0, (x, y) => {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
          collisionFilter: {group: group},
          chamfer: 5,
          density: 0.005,
          frictionAir: 0.05
        })
      });
      //
      this.matter.add.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 0,
        render: {
          visible: true
        }
      });
      //
      let stack = this.matter.add.stack(250, 50, 6, 3, 0, 0, (x, y) => {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 50, 50, Phaser.Math.Between(20, 40));
      });
      //
      this.matter.add.rectangle(30, 490, 220, 380, {
        isStatic: true,
        chamfer: {radius: 20}
      });
      //
      this.matter.add.rectangle(770, 490, 220, 380, {
        isStatic: true,
        chamfer: {radius: 20}
      });
      //
      this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
        pointA: {x: 140, y: 300},
        pointB: {x: -25, y: 0}
      });
      //
      this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
        pointA: {x: 660, y: 300},
        pointB: {x: 25, y: 0}
      });
    }

    update () {
    }

    render () {
    }
  }
})();
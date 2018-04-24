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
      this.cloth = null;
      this.blitter = null;
    }

    preload () {
      this.load.image('ball', 'assets/sprites/crate32.png');
      this.load.spritesheet('balls', 'assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17});
    }

    create () {
      this.blitter = this.add.blitter(0, 0, 'balls');
      //
      this.matter.world.setBounds();
      this.matter.add.mouseSpring();
      //
      let group = this.matter.world.nextGroup(true);
      //
      let particleOptions = {friction: 0.0001, collisionFilter: {group: group}, render: {visible: false}};
      let constraintOptions = {stiffness: 0.06};
      // softBody: function(x, y, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions)
      this.cloth = this.matter.add.softBody(200, 140, 20, 12, 5, 5, false, 8, particleOptions, constraintOptions);
      //
      let f = 0;
      for (let i = 0; i < this.cloth.bodies.length; i++) {
        let body = this.cloth.bodies[i];
        if (i < 20) {
          body.isStatic = true;
        }
        if (i % 20 === 0) {
          f++;
          if (f > 5) {
            f = 0;
          }
        }
        //
        body.gameObject = this.blitter.create(body.position.x, body.position.y, f);
      }

      //
      this.matter.add.circle(300, 500, 80, { isStatic: true });
      this.matter.add.rectangle(500, 480, 80, 80, { isStatic: true });
      this.matter.add.rectangle(400, 609, 800, 50, { isStatic: true });

    }

    update () {
      for (let i = 0; i < this.cloth.bodies.length; i++) {
        let body = this.cloth.bodies[i];
        body.gameObject.x = body.position.x;
        body.gameObject.y = body.position.y;
      }
    }

    render () {
    }
  }
})();
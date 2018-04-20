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
          gravity: 50,
          maxVelocity: 500
        }
      },
      scene: [SceneA, SceneB, SceneC]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class SceneA extends ErtaoGameScene {
    constructor () {
      super({key: 'SceneA'});
    }

    preload () {
      this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
    }

    create () {
      let wallThickness = 64;
      let sides = (wallThickness * 2) + 96;
      let worldBounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);
      let spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(worldBounds), -sides, -sides);
      //
      this.anims.create({
        key: 'diamond',
        frames: this.anims.generateFrameNames('gems', {prefix: 'diamond_', end: 15, zeroPad: 4}), repeat: -1
      });
      this.anims.create({
        key: 'prism',
        frames: this.anims.generateFrameNames('gems', {prefix: 'prism_', end: 6, zeroPad: 4}),
        repeat: -1
      });
      this.anims.create({
        key: 'ruby',
        frames: this.anims.generateFrameNames('gems', {prefix: 'ruby_', end: 6, zeroPad: 4}),
        repeat: -1
      });
      this.anims.create({
        key: 'square',
        frames: this.anims.generateFrameNames('gems', {prefix: 'square_', end: 14, zeroPad: 4}),
        repeat: -1
      });
      //
      let anims = ['diamond', 'prism', 'ruby', 'square'];
      //
      for (let i = 0; i < 16; i++) {
        let pos = Phaser.Geom.Rectangle.Random(spriteBounds);
        let block = this.impact.add.sprite(pos.x, pos.y, 'gems');
        //
        block.setActive().setAvsB().setBounce(1);
        block.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
        //
        if (Math.random() > 0.5) {
          block.vel.x *= -1;
        } else {
          block.vel.y *= -1;
        }
        //
        block.play(Phaser.Math.RND.pick(anims));
      }
      //
      this.impact.world.setBounds(0, 0, worldBounds.width, worldBounds.height, wallThickness);
    }
  }

  class SceneB extends ErtaoGameScene {
    constructor () {
      super({
        key: 'SceneB',
        active: true,
        physics: {
          system: 'impact',
          gravity: 0
        }
      });
    }

    preload () {
      this.load.image('block', 'assets/sprites/block.png');
    }

    create () {
      let blockA = this.impact.add.image(300, 300, 'block');
      let blockB = this.impact.add.image(60, 300, 'block');
      let blockC = this.impact.add.image(730, 300, 'block');
      //
      blockA.setTypeA().setCheckAgainstA().setActive().setMaxVelocity(300);
      blockB.setTypeB().setCheckAgainstA().setFixed();
      blockC.setTypeB().setCheckAgainstA().setFixed();
      //
      blockA.setBounce(1).setVelocityX(300);

    }
  }

  class SceneC extends ErtaoGameScene {
    constructor () {
      super({
        key: 'SceneC',
        active: true,
        physics: {
          system: 'impact',
          gravity: 100,
          setBounds: true
        }
      });
      this.ship = null;
    }

    preload () {
      this.load.image('ship', 'assets/sprites/arrow.png');
    }

    create () {
      this.ship = this.impact.add.image(320, 450, 'ship').setActive().setVelocity(200, -200).setBounce(1);
      this.add.text(0, 0, 'Press 1 to 3 to pause the scene');
      //
      this.input.on('KEY_DOWN_ONE', (event) => {
        console.info('KEY_DOWN_ONE');
        this.scene.isActive('sceneA') ? this.scene.pause('sceneA') : this.scene.resume('sceneA');
      });
      //
      this.input.on('KEY_DOWN_TWO', (event) => {
        console.info('KEY_DOWN_TWO');
        this.scene.isActive('sceneB') ? this.scene.pause('sceneB') : this.scene.resume('sceneB');
      });
      //
      this.input.on('KEY_DOWN_THREE', (event) => {
        console.info('KEY_DOWN_THREE');
        this.scene.isActive('sceneC') ? this.scene.pause('sceneC') : this.scene.resume('sceneC');
      });
    }

    update (time, delta) {
      this.ship.rotation = Math.atan2(this.ship.vel.y, this.ship.vel.x);
    }
  }
})();
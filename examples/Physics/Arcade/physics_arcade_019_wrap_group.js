(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: {y: 0}
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
      this.animsList = null;
      this.group = null;
    }

    preload () {
      this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
    }

    create () {
      this.anims.create({
        key: 'diamond',
        frames: this.anims.generateFrameNames('gems', {prefix: 'diamond_', end: 15, zeroPad: 4}),
        repeat: -1
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
      this.animsList = ['diamond', 'prism', 'ruby', 'square'];
      //
      this.group = this.physics.add.group({key: 'gems', repeat: 11});
      //
      this.group.children.iterate(this.createGem, this);
    }

    render () {
    }

    update () {
      this.physics.world.wrap(this.group, 32);
    }

    createGem (gem) {
      Phaser.Geom.Rectangle.Random(this.physics.world.bounds, gem);
      gem.play(Phaser.Math.RND.pick(this.animsList));
      gem.setVelocity(Phaser.Math.Between(-150, 150), Phaser.Math.Between(-150, 150));
    }
  }
})();
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
    }

    preload () {
      this.load.unityAtlas('ant', 'assets/atlas/ant.png', 'assets/atlas/ant.meta');
      this.load.unityAtlas('ant2', 'assets/atlas/ant2.png', 'assets/atlas/ant2.meta');
    }

    create () {
      this.anims.create({
        key: 'nod',
        frames: this.anims.generateFrameNames('ant', {prefix: 'ant1Sprite_', end: 12}),
        repeat: -1,
        repeatDelay: 2,
        frameRate: 15
      });
      //
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('ant2', {prefix: 'ant2Sprite_', end: 3}),
        repeat: -1,
        frameRate: 14
      });
      //
      let walker = this.add.sprite(1000, 250, 'ant2', 'ant2Sprite_0').play('walk');
      //
      this.add.sprite(200, 400, 'ant', 'ant1Sprite_0').play('nod');
      //
      this.tweens.add({
        targets: walker,
        x: -200,
        duration: 6000,
        ease: 'Linear'
      });
    }

    update () {
    }

    render () {
    }
  }
})();
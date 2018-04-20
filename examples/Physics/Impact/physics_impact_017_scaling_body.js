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
          // gravity: 100,
          maxVelocity: 300
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
      this.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', {
        frameWidth: 40,
        frameHeight: 60
      });
    }

    create () {
      this.impact.world.setBounds();
      //
      let scalingBody = this.impact.add.image(200, 140, 'gameboy', 2).setActive().setFixed().setBodyScale(3);
      //
      this.movingBody = this.impact.add.image(600, 200, 'gameboy', 3).setActive();
      //
      let scale = {x: 3, y: 3};
      //
      this.tweens.add({
        targets: scale,
        x: 6, y: 6,
        duration: 2000,
        ease: 'Linear.easeNone',
        yoyo: true,
        repeat: -1,
        paused: false,
        onUpdate: () => {
          scalingBody.setBodyScale(scale.x, scale.y);
          scalingBody.syncGameObject();
        }
      })
    }

    update () {
      this.movingBody.vel.x = -100;
    }

    render () {
    }
  }
})();
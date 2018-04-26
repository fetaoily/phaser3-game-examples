(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      scene: [SceneA, SceneB]
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
      super({key: 'sceneA'});
    }

    preload () {
      this.load.image('bg', 'assets/pics/skull-and-bones.jpg');
      this.load.image('block', 'assets/sprites/50x50-black.png');
    }

    create () {
      //
      this.add.image(400, 300, 'bg');
      //
      let blocks = this.add.group({key: 'block', repeat: 191});
      //
      Phaser.Actions.GridAlign(blocks.getChildren(), {
        width: 16,
        cellWidth: 50,
        cellHeight: 50,
        x: 25,
        y: 25
      });
      //
      let _this = this;
      let i = 0;
      //
      blocks.children.iterate((child) => {
        _this.tweens.add({
          targets: child,
          scaleX: 0,
          scaleY: 0,
          alpha: 0,
          y: '+=64',
          angle: 180,
          ease: 'Power3',
          duration: 1000,
          delay: 1000 + (i * 100)
        });
        //
        i++;
        // Change the value 32 for different results
        if (i % 16 === 0) {
          i = 0;
        }
      });
      //
      this.input.on('pointerdown', () => {
        this.scene.start('sceneB');
      }, this);
      //
      let text = this.add.text(400, 300, 'SceneA', {font: '64px Arial', fill: '#ff00ff'}).setDepth(0);
      text.setOrigin(0.5);
    }

    update () {
    }
  }

  class SceneB extends ErtaoGameScene {
    constructor () {
      super({key: 'sceneB'});
    }

    create () {
      //
      let text = this.add.text(400, 300, 'SceneB', {font: '64px Arial', fill: '#ff00ff'});
      text.setOrigin(0.5);
      //
      this.input.on('pointerdown', () => {
        this.scene.start('sceneA');
      });
    }

  }
})();
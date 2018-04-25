(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          gravity: {
            y: 0.3
          }
        }
      },
      scene: [Preloader, MainMenu, Game, GameOver]
    };
    this.game = game = new NewGame(this.gameConfig);
  };

  class NewGame extends ErtaoGame {
    constructor (config) {
      super(config);
    }
  }

  class Preloader extends ErtaoGameScene {
    constructor () {
      super({key: 'preload'});
    }

    preload () {
      this.load.image('buttonBG', 'assets/sprites/button-bg.png');
      this.load.image('buttonText', 'assets/sprites/button-text.png');
      this.load.image('ayu', 'assets/pics/ayu.png');
      this.load.image('ball', 'assets/sprites/pangball.png');
    }

    create () {
      console.log('%c Preloader ', 'background: green;color: white; display: block;')
      //
      this.scene.start('mainmenu');
    }

    update () {
    }
  }

  class MainMenu extends ErtaoGameScene {
    constructor () {
      super({key: 'mainmenu'});
    }

    create () {
      console.info('%c MainMenu ', 'background: green; color: white; display: block;');
      //
      let bg = this.add.image(0, 0, 'buttonBG');
      let text = this.add.image(0, 0, 'buttonText');
      //
      let container = this.add.container(400, 300, [bg, text]);
      //
      bg.setInteractive();
      bg.once('pointerup', () => {
        this.scene.start('game');
      }, this);
    }
  }

  class Game extends ErtaoGameScene {
    constructor () {
      super({key: 'game'});
    }

    create () {
      console.log('%c Game ', 'background: green; color: white; display: block;');
      //
      this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
      // Add in a stack of balls
      for (let i = 0; i < 64; i++) {
        let ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
      }
      //
      let cursors = this.input.keyboard.createCursorKeys();
      let controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.05,
        drag: 0.0005,
        maxSpeed: 1.0
      };
      //
      this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
      //
      this.add.text(0, 0, 'Use Cursors to scroll camera.\n Click to Quit', {
        font: '18px Courier',
        fill: '#00ff00'
      }).setScrollFactor(0);
      //
      this.input.once('pointerup', () => {
        this.scene.start('gameover');
      }, this);
    }

    update (time, delta) {
      this.controls.update(delta);
    }

  }

  class GameOver extends ErtaoGameScene {
    constructor () {
      super({key: 'gameover'});
    }

    create () {
      console.log('%c GameOver ', 'background: green; color: white; display: block;');
      //
      this.add.sprite(400, 300, 'ayu');
      //
      this.add.text(300, 500, 'Game Over - Click to start restart', {font: '16px Courier', fill: '#00ff00'});
      //
      this.input.once('pointerup', (event) => {
        this.scene.start('mainmenu');
      }, this);
    }
  }
})();
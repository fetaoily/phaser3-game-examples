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
      this.load.image('ayu', 'assets/pics/ayu2.png');
      this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
    }

    create () {
      // Create a stack of random cards
      let frames = this.textures.get('cards').getFrameNames();
      let x = 100;
      let y = 100;
      for (let i = 0; i < 64; i++) {
        let image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        this.input.setDraggable(image);
        y += 6;
      }
      // A drop zone
      let zone = this.add.image(500, 300, 'ayu').setInteractive();
      zone.input.dropZone = true;
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        this.children.bringToTop(gameObject);
      }, this);
      //
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.input.on('dragenter', (requestPointerLock, gameObject, dropZone) => {
        zone.setTint(0x00ff00);
      });
      //
      this.input.on('dragleave', (pointer, gameObject, dropZone) => {
        zone.clearTint();
      });
      //
      this.input.on('drop', (pointer, gameObject, dropZone) => {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        //
        gameObject.setScale(0.2);
        //
        gameObject.input.enabled = false;
        //
        zone.clearTint();
      });
      //
      this.input.on('dragend', (requestPointerLock, gameObject, dropped) => {
        if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
        }
      });
    }

    update () {
    }

    render () {
    }
  }
})();
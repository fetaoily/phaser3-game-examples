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
      let zone = this.add.zone(500, 300, 300, 300).setDropZone();
      // Just a visual display of the drop zone
      let graphics = this.add.graphics();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
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
      this.input.on('dragenter', (pointer, gameObject, dropZone) => {
        graphics.clear();
        graphics.lineStyle(2, 0x00ffff);
        graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
      });
      //
      this.input.on('dragleave', (pointer, gameObject, dropZone) => {
        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
      });
      //
      this.input.on('drop', (pointer, gameObject, dropZone) => {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        //
        gameObject.input.enabled = false;
      });
      //
      this.input.on('dragend', (pointer, gameObject, dropped) => {
        if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
        }
        //
        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
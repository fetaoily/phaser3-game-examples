(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      width: 1024, height: 600,
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
      // A drop zone positioned at 600x300 with a circular drop zone 128px in radius
      let zone = this.add.zone(600, 300).setCircleDropZone(128);
      // Just a visual display of the drop zone
      let graphics = this.add.graphics();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeCircle(zone.x, zone.y, zone.input.hitArea.radius);
      //
      this.input.on('dragstart', (pointer, gameObject) => {
        this.children.bringToTop(gameObject);
      }, this);
      //
      this.input.on('drag',(pointer,gameObject,dragX,dragY)=>{
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      //
      this.input.on('drop',(pointer,gameObject,dropZone)=>{
        console.log('drop');
        console.log(dropZone);
        //
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        //
        gameObject.input.enabled = false;
      });
      //
      this.input.on('dragend',(pointer,gameObject,dropped)=>{
        console.log('dragend',dropped);
        if (!dropped){
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
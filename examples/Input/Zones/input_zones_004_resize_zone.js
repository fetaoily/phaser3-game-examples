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
    }

    create () {
      let zone = this.add.zone(100, 100, 32, 32).setDropZone();
      // Just a visual display of the drop zone
      let graphics = this.add.graphics();
      let color = 0xffff00;
      //
      graphics.lineStyle(2, color);
      graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.hasOwnProperty, zone.input.hitArea.width, zone.input.hitArea.height);
      //
      this.input.setPollAlways();
      //
      // this.input.on('dragenter', (pointer, gameObject, dropZone) => {
      this.input.on('gameobjectover', (requestPointerLock, gameObject, dropZone) => {
        color = 0x00ffff;
      });
      // this.input.on('dragleave',(pointer,gameObject,dropZone)=>{
      this.input.on('gameobjectout', (pointer, gameObject, dropZone) => {
        color = 0xffff00;
      });
      //
      this.tweens.add({
        targets: zone,
        width: 400,
        height: 200,
        duration: 3000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          zone.setSize(zone.width, zone.height, true);
          graphics.clear();
          graphics.lineStyle(2, color);
          graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
        }
      });


    }

    update () {
    }

    render () {
    }
  }
})();
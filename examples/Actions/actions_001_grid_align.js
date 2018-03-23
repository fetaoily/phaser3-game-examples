(() => {
  'use strict';

  let game;

  window.onload = () => {
    let config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#2d2d2d',
      parent: 'phaser-example',
      scene: [PlayGame]
    };
    window.game = game = new Phaser.Game(config);
  };

  class PlayGame {
    preload() {
      this.load.spritesheet('diamonds', '/assets/sprites/diamonds32x24x5.png', {
        frameWidth: 32,
        frameHeight: 24
      });
    }

    create() {
      let group = this.add.group({
        key: 'diamonds',
        frame: [0, 1, 2, 3, 4],
        frameQuantity: 20
      });
      //
      Phaser.Actions.GridAlign(group.getChildren(), {
        width: 10,
        height: 10,
        cellWidth: 32,
        cellHeight: 32,
        x: 100,
        y: 100
      });
    }

    update() {}

    render() {}
  }
})();

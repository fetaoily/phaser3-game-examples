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
      this.load.image('pic', 'assets/pics/skull-and-bones.jpg');
      this.load.image('vulkaiser', 'assets/pics/vulkaiser-red.png');
      this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
      // In the middle
      this.add.image(400, 300, 'pic');
      // Why isn't this cropped?
      this.scroller = this.add.image(400, 300, 'vulkaiser').setScale(4).setAlpha(0.3);
      // In the corners
      this.add.image(0, 0, 'mushroom').setOrigin(0, 0);
      this.add.image(800, 0, 'mushroom').setOrigin(1, 0);
      this.add.image(0, 600, 'mushroom').setOrigin(0, 1);
      this.add.image(800, 600, 'mushroom').setOrigin(1, 1);
      //
      let cam = this.cameras.main;
      // Test 1 - Change the x/y and keep w/h the same and the scene is cropped properly. The x/y appear to offset from the top left.
      cam.setViewport(0, 0, 800, 600);
      // Test 2 - Combine the Test 1 with 'zoom' and the scene is no longer cropped and the viewport size is scaled wrong
      cam.zoom = 0.5;
      // Test 3 - Try half zoom and a half viewport size together - appears broken, image still pops out fo the top, placement seems wrong
      cam.setViewport(300, 100, 400, 300);
      cam.zoom = 0.5;
      cam.scrollX = 200;
      cam.scrollY = 150;
      // Test 4 - Change position as if zoom is applied to the camera center, but keep original w/h
      // Seems to place the camera in the correct position, but scaled items appear outside of the viewport ( because scissor width = 800x600)
      cam.setViewport(-200, -150, 800, 600);
      cam.zoom = 0.5;
      // Test 5 - Change position and viewport with zoom. Gets scissored properly but scale is all wrong (half size itt should be) and weirdly offset.
      cam.setViewport(-200, -150, 400, 300);
      cam.zoom = 0.5;

    }

    update () {
    }

    render () {
    }
  }
})();
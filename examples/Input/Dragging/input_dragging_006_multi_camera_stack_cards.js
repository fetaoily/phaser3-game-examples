(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      width: 1024,
      height: 600,
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
      //
      for (let i = 0; i < 64; i++) {
        let image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
        // image.setScrollFactor(0.25);
        // image.setScrollFactor(0.5);
        // image.setScrollFactor(2);
        //
        this.input.setDraggable(image);
        //
        x += 4;
        y += 4;
      }
      //
      // Tricky to work out the right scroll to use , maybe centerToSize should do it for use?
      // this.cam1 = this.cameras.main.setSize(512, 300).setZoom(0.5).centerToSize().setBackgroundColor('#000000').setName('Black');
      // this.cam2 = this.cameras.add(512, 0, 512, 300).setZoom(0.25).setScroll(1024 - 256, 600 - 150).setBackgroundColor('#0000aa').setName('Blue');
      // this.cam3 = this.cameras.add(0, 300, 512, 300).setZoom(0.5).centerToSize().setBackgroundColor('#00aa00').setName('Green');
      // this.cam4 = this.cameras.add(512, 300, 512, 300).setZoom(0.5).centerToSize().setBackgroundColor('#aa0000').setName('Red');
      this.cam1 = this.cameras.main.setSize(512, 300).setZoom(0.5).setBackgroundColor('#000000').setName('Black');
      this.cam2 = this.cameras.add(512, 0, 512, 300).setZoom(0.25).setBackgroundColor('#0000aa').setName('Blue');
      this.cam3 = this.cameras.add(0, 300, 512, 300).setZoom(0.5).setBackgroundColor('#00aa00').setName('Green');
      this.cam4 = this.cameras.add(512, 300, 512, 300).setZoom(0.5).setBackgroundColor('#aa0000').setName('Red');
      //
      // Add some rotation to camera 4
      this.cam4.setRotation(0.4);
      //
      console.info(this.cam1.scrollX, this.cam1.scrollY);
      console.info(this.cam2.scrollX, this.cam2.scrollY);
      console.info(this.cam3.scrollX, this.cam3.scrollY);
      console.info(this.cam4.scrollX, this.cam4.scrollY);
      //
      let martix = new Phaser.GameObjects.Components.TransformMatrix();
      //
      this.input.on('drag', (pointer, gameObject) => {
        let camera = pointer.camera;
        // Convert pointer x/y into camera space
        martix.applyITRS(camera.x, camera.y, -camera.rotation, camera.zoom, camera.zoom);
        martix.invert();
        //
        let p = martix.transformPoint(pointer.x, pointer.y);
        //
        // gameObject.x = p.x + camera.x * camera.zoom;
        // gameObject.y = p.y + camera.y * camera.zoom;
        //
        // gameObject.x = p.x - camera.scrollX * camera.zoom;
        // gameObject.y = p.y - camera.scrollY * camera.zoom;
        //
        // gameObject.x = p.x * gameObject.scrollFactorX;
        // gameObject.y = p.y * gameObject.scrollFactorY;
        //
        // This works if scrollFactor = 0.5, but not at any other scrollFactor.
        // I assume because camera zoom is 0.5?
        // gameObject.x = p.x + camera.scrollX;
        // gameObject.y = p.y + camera.scrollY;
        //
        gameObject.x = (p.x * gameObject.scrollFactorX) + camera.scrollX;
        gameObject.y = (p.y * gameObject.scrollFactorY) + camera.scrollY;
      })
    }

    update () {
    }

    render () {
    }
  }
})();
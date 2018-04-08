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
      this.camera = null;
      this.grass = [];
      this.track = null;
      this.acceleration = {z: 18};
      this.startZ = 2000;
      this.grassFrames = [7, 8, 1, 2, 20, 7, 8, 1, 2, 20, 7, 8, 1, 2, 20, 6, 3, 1, 2, 20, 6, 3, 4, 8, 7, 14, 16, 11, 13, 12, 9, 25, 27, 5, 10, 15, 17, 18, 19, 21, 22, 23, 24, 26, 28, 29, 30];
    }

    preload () {
      this.load.image('sky', 'assets/tests/meadow/summer.jpg');
      this.load.image('strip', 'assets/tests/meadow/grass-strip.png');
      this.load.atlas('grass', 'assets/tests/meadow/grass.png', 'assets/tests/meadow/grass.json');
    }

    create () {
      let sky = this.add.image(300, -100, 'sky').setOrigin(0.5, 0).setDepth(-1000);
      //
      this.camera = this.cameras3d.add(40).setPosition(200, -190, 1500).setPixelScale(384);
      //
      let width = 20;
      let depth = 60;
      let left = -(80 * (width / 2));
      // Grass strips
      this.track = this.camera.createRect({x: 1, y: 1, z: 32}, 120, 'strip');
      //
      for (let z = 0; z < depth; z++) {
        for (let x = 0; x < width; x++) {
          let diff = Phaser.Math.Between(-60, 60);
          let bx = left + (x * 80) + diff;
          let bz = (z * 96) + diff;
          let sprite3D = this.camera.create(bx, 0, bz, 'grass', 'grass-spring-' + Phaser.Math.RND.weightedPick(this.grassFrames));
          sprite3D.gameObject.setOrigin(0.5, 1);
          this.grass.push(sprite3D);
        }
      }
      //
      this.cameras.main.rotation = -0.2;
      //
      this.tweens.add({
        targets: this.cameras.main,
        rotation: 0.2,
        duration: 6000,
        delay: 5000,
        yoyo: true,
        repeat: -1,
        repeatDelay: 4000,
        hold: 3000,
        ease: 'Sine.easeInOut'
      });
      //
      this.tweens.add({
        targets: this.acceleration,
        z: 10,
        delay: 12000,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        repeatDelay: 8000,
        hold: 3000,
        ease: 'Sine.easeInOut'
      });
      //
      this.tweens.add({
        targets: this.camera,
        y: -130,
        delay: 12000,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        repeatDelay: 8000,
        hold: 3000,
        ease: 'Sine.easeInOut'
      });
      //
      this.tweens.add({
        targets: this.camera,
        x: -200,
        delay: 20000,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        repeatDelay: 8000,
        hold: 5000,
        ease: 'Sine.easeInOut'
      });
      //
      this.tweens.add({
        targets: sky,
        x: 400,
        delay: 20000,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        repeatDelay: 8000,
        hold: 5000,
        ease: 'Sine.easeInOut'
      });

    }

    update () {
      // Move it
      for (let i = 0; i < this.track.length; i++) {
        let segment = this.track[i];
        segment.z += this.acceleration.z;
        if (segment.z > (this.camera.z + 128)) {
          segment.z -= this.startZ;
        }
      }
      //
      for (let i = 0; i < this.grass.length; i++) {
        let segment = this.grass[i];
        segment.z += this.acceleration.z;
        if (segment.z > (this.camera.z + 128)) {
          segment.gameObject.setFrame('grass-spring-' + Phaser.Math.RND.weightedPick(this.grassFrames));
          segment.size.set(segment.gameObject.width, segment.gameObject.height);
          segment.gameObject.setOrigin(0.5, 1);
          segment.z -= this.startZ;
        }
      }
      //
      this.camera.update();
    }

    render () {
    }
  }
})();
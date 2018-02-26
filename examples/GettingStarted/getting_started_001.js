let game;

window.onload = () => {
  //
  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 200}
      }
    },
    scene: PlayGame,
    currentScaleMode: Phaser.ScaleModes.NEAREST
  };
  //
  game = new Phaser.Game(config);
};

//
let PlayGame = {
  preload () {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space2.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  },
  create () {
    this.add.image(400, 300, 'sky');
    let particles = this.add.particles('red');
    let emitter = particles.createEmitter({
      speed: 100,
      scale: {start: 1, end: 0},
      blendMode: 'ADD'
    });
    let logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    emitter.startFollow(logo);
  },
  update () {
  },
  render () {
  }
};
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
    constructor(config) {
      super(config);
    }
  }

  class PlayGame extends ErtaoGameScene {
    constructor() {
      super();
      this.i = 0;
      this.y = 100;
    }

    preload() {
      this.load.atlas(
        'gems',
        '/assets/tests/columns/gems.png',
        '/assets/tests/columns/gems.json'
      );
    }

    create() {
      // Each time a new animation is added to the Animation Manager we'll call this function
      this.anims.on('add', this.addAnimation.bind(this));
      //
      this.input.on('pointerup', () => {
        switch (this.i) {
          case 0: {
            this.anims.create({
              key: 'diamond',
              frames: this.anims.generateFrameNames('gems', {
                prefix: 'diamond_',
                end: 15,
                zeroPad: 4
              }),
              repeat: -1
            });
            break;
          }
          case 1: {
            this.anims.create({
              key: 'prism',
              frames: this.anims.generateFrameNames('gems', {
                prefix: 'prism_',
                end: 6,
                zeroPad: 4
              }),
              repeat: -1
            });
            break;
          }
          case 2: {
            this.anims.create({
              key: 'ruby',
              frames: this.anims.generateFrameNames('gems', {
                prefix: 'ruby_',
                end: 6,
                zeroPad: 4
              }),
              repeat: -1
            });
            break;
          }
          case 3: {
            this.anims.create({
              key: 'square',
              frames: this.anims.generateFrameNames('gems', {
                prefix: 'square_',
                end: 14,
                zeroPad: 4
              }),
              repeat: -1
            });
            break;
          }
        }
        this.i++;
      });
    }

    update() {}

    render() {}

    addAnimation(key) {
      this.add.sprite(400, this.y, 'gems').play(key);
      this.y += 100;
    }
  }
})();

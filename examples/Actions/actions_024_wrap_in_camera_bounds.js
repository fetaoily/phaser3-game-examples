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
      this.graphics = null;
      this.rect = null;
      this.shapes = null;
    }

    preload() {}

    create() {
      this.graphics = this.add.graphics();
      //
      this.shapes = new Array(15).fill(null).map((nul, i) => {
        return new Phaser.Geom.Circle(
          Phaser.Math.Between(0, 800),
          Phaser.Math.Between(0, 600),
          Phaser.Math.Between(25, 75)
        );
      });
      //
      this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
    }

    update() {
      this.shapes.forEach((shape, i) => {
        shape.x += 1 + 0.1 * i;
        shape.y += 1 + 0.1 * i;
      });
      // Phaser.Actions.WrapInRectangle(this.shapes, this.rect, 72);
      //
      this.draw();
    }

    render() {}

    draw() {
      this.graphics.clear();
      //
      this.shapes.forEach((shape, i) => {
        this.graphics.fillStyle(this.color(i), 0.5).fillCircleShape(shape);
      });
    }

    color(i) {
      return 0x001100 * (i % 15) + 0x000033 * (i / 5);
    }
  }
})();

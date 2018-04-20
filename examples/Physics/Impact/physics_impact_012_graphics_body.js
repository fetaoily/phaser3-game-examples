(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'impact',
        impact: {
          debug: true,
          gravity: 100,
          maxVelocity: 500
        }
      },
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
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create a Graphics object
      let graphics = this.add.graphics();
      // And draw something to it
      // this.drawStar(graphics, 0, 0, 1, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 2, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 3, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 4, 64, 64 / 2, 0xffff00, 0xff0000);
      this.drawStar(graphics, 0, 0, 5, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 6, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 7, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 8, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 9, 64, 64 / 2, 0xffff00, 0xff0000);
      // this.drawStar(graphics, 0, 0, 10, 64, 64 / 2, 0xffff00, 0xff0000);
      // If you don't set the body as active it won't collide with the world bounds
      let body = this.impact.add.body(200, 200).setActive().setVelocity(300, 150).setBounce(1);
      // Assign the graphics object to the body. 'false' tells it not to use the Graphics size.
      body.setGameObject(graphics, false);
      // The body needs a size for Graphics objects, as it cannot infer it from the Graphics itself
      // Remember that 0x0 in the Graphics object = this top left of the Body so call setOffset to adjust it
      body.setOffset(-50, -50, 100, 100);
      // This method works by changing the x/y coordinates of the Graphics object itself.
      // If you wish to draw something to a Graphics object that doesn't move see 'dynamic graphics body'
    }

    update () {
    }

    render () {
    }

    drawStar (graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      graphics.lineStyle(4, lineColor, 1);
      graphics.fillStyle(color, 1);
      graphics.beginPath();
      graphics.moveTo(cx, cy - outerRadius);
      //
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        graphics.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        graphics.lineTo(x, y);
        rot += step;
      }
      //
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
    }
  }
})();
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
      // Calling this with no arguments will set the bounds to match the game config width/height
      this.impact.world.setBounds();
      // Create a Graphics object
      let graphics = this.add.graphics();
      // If you don't set the body as active it won't collide with the world bounds
      let star = this.impact.add.body(200, 200).setActive().setVelocity(300, 150).setBounce(1);
      // Set a body size of 100x100
      star.setBodySize(100, 100);
      //
      star.body.updateCallback = (body) => {
        graphics.clear();
        //
        this.drawStar(graphics, body.pos.x + 50, body.pos.y + 50, 5, 64, 64 / 2, 0x0000ff, 0xffffff);
      };
    }

    create () {
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
      //
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
        //
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        graphics.lineTo(x, y);
        rot += step;
      }
      graphics.lineTo(cx, cy - outerRadius);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
    }

  }
})();
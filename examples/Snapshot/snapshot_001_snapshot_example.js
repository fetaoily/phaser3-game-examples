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
      this.div = document.createElement('div');
      this.div.innerHTML = 'PRESS SPACE TO TAKE SNAPSHOT<br>';
      document.body.appendChild(this.div);
      this.time = 0;
      this.snapHistory = [];
      this.graphics = null;
      this.graphicsPath = [];
      this.isMouseDown = false;
      this.isKeyDown = false;
    }

    preload () {
      this.load.image('myImage', '/assets/sprites/phaser1.png');
      this.load.glsl('shader0', '/assets/shaders/shader0.frag');
    }

    create () {
      for (let i = 0; i < 5; i++) {
        let image = this.add.image(Math.random() * 800, Math.random() * 600, 'myImage');
      }
      //
      this.graphics = this.add.graphics({x: 0, y: 0});
      //
      game.canvas.onmousedown = (e) => {
        this.isMouseDown = true;
        this.graphics.clear();
        this.graphicsPath.length = 0;
      };
      //
      game.canvas.onmouseup = (e) => {
        this.isMouseDown = false;
      };
      //
      game.canvas.onmousemove = (e) => {
        let mouseX = e.clientX - game.canvas.offsetLeft;
        let mouseY = e.clientY - game.canvas.offsetTop;
        if (this.isMouseDown) {
          this.graphicsPath.push({x: mouseX, y: mouseY});
        }
      };
      //
      window.onkeydown = (e) => {
        if (e.keyCode === 32 && !this.isKeyDown) {
          game.renderer.snapshot((image) => {
            image.style.width = '160px';
            image.style.height = '120px';
            image.style.paddingLeft = '2px';
            this.snapHistory.push(image);
            console.log('snap!');
            document.body.appendChild(image);
          });
          this.isKeyDown = true;
        }
      };
      //
      window.onkeyup = (e) => {
        if (e.keyCode === 32) {
          this.isKeyDown = false;
        }
      };
    }

    update () {
      let length = this.graphicsPath.length;
      this.graphics.clear();
      this.graphics.lineStyle(10.0, 0xffff00, 1.0);
      this.graphics.beginPath();
      for (let i = 0; i < length; i++) {
        let node = this.graphicsPath[i];
        if (i !== 0) {
          this.graphics.lineTo(node.x, node.y);
        } else {
          this.graphics.moveTo(node.x, node.y);
        }
      }
      this.graphics.strokePath();
      this.graphics.closePath();
      //
      this.time += 0.01;
    }

    render () {
    }
  }
})();
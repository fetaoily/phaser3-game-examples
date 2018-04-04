'use strict';
window.resize = () => {
  //
  if (
      !window.gameConfig &&
      !window.gameConfig.width &&
      !window.game.gameConfig.height
  ) {
    return;
  }
  //
  let canvas = document.querySelector('canvas');
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = window.gameConfig.width / window.gameConfig.height;
  //
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
};

let defaultGameConfig = (window.defaultGameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  title: 'Ertao Game',
  banner: {
    text: '#ffffff',
    background: [
      '#fff200',
      '#38f0e8',
      '#00bff3',
      '#ec008c',
      '#ff3300'
    ],
    hidePhaser: false
  }
});

class ErtaoGame extends Phaser.Game {
  constructor (config) {
    super(Object.assign(defaultGameConfig, config));
    window.resize();
    window.addEventListener('resize', window.resize);
  }
}

window.ErtaoGame = ErtaoGame;

class ErtaoGameScene extends Phaser.Scene {
  preload () {
  }

  create () {
  }

  update () {
  }

  render () {
  }
}

window.ErtaoGameScene = ErtaoGameScene;

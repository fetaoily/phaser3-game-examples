window.resize = () => {
  'use strict';
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

class ErtaoGame extends Phaser.Game {
  constructor(config) {
    super(config);
    window.resize();
    window.addEventListener('resize', window.resize);
  }
}

window.ErtaoGame = ErtaoGame;

class ErtaoGameScene {
  preload() {}

  create() {}

  update() {}

  render() {}
}

window.ErtaoGameScene = ErtaoGameScene;

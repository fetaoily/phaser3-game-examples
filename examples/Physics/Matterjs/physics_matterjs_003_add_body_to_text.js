(() => {
  'use strict';
  let game;
  let gameConfig;
  window.onload = () => {
    this.gameConfig = gameConfig = {
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            y: 0.3
          }
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

    preload () {this.load.image('platform', 'assets/sprites/platform.png');
    }

    create () {
      let text1 = this.add.text(100,0,'Phaser 3',{font:'32px Arial',fill:'#00ff00'});
      let text2 = this.add.text(100,-100,'Phaser 3',{font:'32px Arial',fill:'#ffff00'});
      //
      let matterText1 = this.matter.add.gameObject(text1, {shape:{type:'polygon',sides:8,radius:64}}).setFrictionAir(0.001).setBounce(0.9);
      let matterText2 = this.matter.add.gameObject(text2).setFrictionAir(0.001).setBounce(0.9);
      //
      this.matter.add.image(350,450,'platform',null, {isStatic:true}).setScale(2,0.5).setAngle(10);
    }

    update () {
    }

    render () {
    }
  }
})();
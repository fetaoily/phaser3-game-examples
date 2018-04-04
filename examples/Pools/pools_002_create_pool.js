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
    }

    preload () {
      this.load.image('cokecan', 'assets/sprites/cokecan.png');
    }

    create () {
      let info = this.add.text(0, 0, 'Click to ad objects', {fill: '#00ff00'});
      // Our pool - essentially a Group that takes advantage of maxSize
      // Setting the maxSize property limits the amount of objects allowed in this pool
      let cans = this.add.group({
        defaultKey: 'cokecan',
        maxSize: 10
      });
      //
      let x = 60;
      //
      this.input.on('pointerdown', () => {
        // Pluck an entry from the pool. If it doesn't already exist, create it.
        // cans.get(x, 300);
        let can = cans.get();
        if (can) {
          this.tweens.add({
            targets: can,
            x: x,
            y: 300,
            repeat: -1,
            yoyo: true
          });
        }
        //
        x += 74;
        info.setText([
          'Used: ' + cans.getTotalUsed(),
          'Free: ' + cans.getTotalFree()
        ])
      });
    }

    update () {
    }

    render () {
    }
  }
})();
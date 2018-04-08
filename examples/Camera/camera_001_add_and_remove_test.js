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
      this.fadeCamera = null;
      this.flashCamera = null;
      this.shakeCamera = null;
      this.camerasAdded = [];
      this.camerasRemoved = [];
      this.adding = false;
      this.scene = null;
    }

    preload () {
      this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png');
    }

    create () {
      this.image = this.add.image(0, 0, 'CherilPerils');
      //
      this.cameras.main.setSize(400, 300);
      //
      this.fadeCamera = this.cameras.add(400, 0, 400, 300);
      //
      this.flashCamera = this.cameras.add(0, 300, 400, 300);
      //
      this.shakeCamera = this.cameras.add(400, 300, 400, 300);
      //
      this.fadeCamera.fade(1000);
      this.camerasAdded.push(this.fadeCamera, this.shakeCamera, this.flashCamera);
      this.scene = window.scene = this;
      //
      this.addAndRemove();
    }

    update () {
      this.flashCamera.flash(1000);
      this.shakeCamera.shake(1000);
      //
      if (this.fadeCamera._fadeAlpha >= 1.0) {
        this.fadeCamera._fadeAlpha = 0.0;
        this.fadeCamera.fade(1000);
      }
    }

    render () {
    }

    addAndRemove () {
      if (this.adding) {
        if (this.camerasRemoved.length > 0) {
          let addingCamera = this.camerasRemoved.pop();
          this.camerasAdded.push(addingCamera);
          this.scene.cameras.addExisting(addingCamera);
        } else {
          this.adding = false;
        }
      } else {
        if (this.camerasAdded.length > 0) {
          let removingCamera = this.camerasAdded.pop();
          this.camerasRemoved.push(removingCamera);
          this.scene.cameras.remove(removingCamera);
        } else {
          this.adding = true;
        }
      }
      window.setTimeout(() => {
        this.addAndRemove();
      }, 500);
    }
  }
})();
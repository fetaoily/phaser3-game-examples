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
      this.load.image('turkey', 'assets/pics/turkey-1985086.jpg');
      this.load.image('face', 'assets/pics/bw-face.png');
    }

    create () {
      // WebGL only;
      let gl = this.sys.game.renderer.gl;
      let consts = [
        gl.ZERO,
        gl.ONE,
        gl.SRC_COLOR,
        gl.ONE_MINUS_SRC_COLOR,
        gl.DST_COLOR,
        gl.ONE_MINUS_DST_COLOR,
        gl.SRC_ALPHA,
        gl.ONE_MINUS_SRC_ALPHA,
        gl.DST_ALPHA,
        gl.ONE_MINUS_DST_ALPHA,
        gl.CONSTANT_COLOR,
        gl.ONE_MINUS_CONSTANT_COLOR,
        gl.CONSTANT_ALPHA,
        gl.ONE_MINUS_CONSTANT_ALPHA,
        gl.SRC_ALPHA_SATURATE
      ];

      let equations = [
        gl.FUNC_ADD,
        gl.FUNC_SUBTRACT,
        gl.FUNC_REVERSE_SUBTRACT
      ];

      let list = [
        {val: 0, text: 'ZERO'},
        {val: 1, text: 'ONE'},
        {val: 2, text: 'SRC_COLOR'},
        {val: 3, text: 'ONE_MINUS_SRC_COLOR'},
        {val: 4, text: 'DST_COLOR'},
        {val: 5, text: 'ONE_MINUS_DST_COLOR'},
        {val: 6, text: 'SRC_ALPHA'},
        {val: 7, text: 'ONE_MINUS_SRC_ALPHA'},
        {val: 8, text: 'DST_ALPHA'},
        {val: 9, text: 'ONE_MINUS_DST_ALPHA'},
        {val: 10, text: 'CONSTANT_COLOR'},
        {val: 11, text: 'ONE_MINUS_CONSTANT_COLOR'},
        {val: 12, text: 'CONSTANT_ALPHA'},
        {val: 13, text: 'ONE_MINUS_CONSTANT_ALPHA'},
        {val: 14, text: 'SRC_ALPHA_SATURATE'}
      ];

      let list2 = [
        {val: 0, text: 'FUNC_ADD'},
        {val: 1, text: 'FUNC_SUBTRACT'},
        {val: 2, text: 'FUNC_REVERSE_SUBTRACT'}
      ];

      let newMode = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
      let equation = equations[0];

      let renderer = this.sys.game.renderer;
      let modeIndex = renderer.addBlendMode(newMode, equation);
      //
      // this.add.image(400, 300, 'face');
      // this.add.image(400, 300, 'dst');
      // this.add.image(400, 300, 'src').setBlendMode(modeIndex);
      // this.add.image(400, 300, 'logo').setBlendMode(modeIndex);
      //
      this.add.image(400, 300, 'turkey');
      //
      let graphics = this.add.graphics();
      let color = 0x00ffff;
      let alpha = 1;
      //
      graphics.fillStyle(color, alpha);
      graphics.fillCircle(400, 300, 256);
      graphics.setBlendMode(modeIndex);
      //
      let srcRGB = $('<select>').attr('id', 'srcRGB').data('idx', 0).appendTo('body');
      let dstRGB = $('<select>').attr('id', 'dstRGB').data('idx', 1).appendTo('body');
      let srcAlpha = $('<select>').attr('id', 'srcAlpha').data('idx', 3).appendTo('body');
      let dstAlpha = $('<select>').attr('id', 'dstAlpha').data('idx', 4).appendTo('body');
      //
      $(list).each(() => {
        srcRGB.append($("<option>").attr('value', this.val).text(this.text));
        dstRGB.append($("<option>").attr('value', this.val).text(this.text));
        srcAlpha.append($("<option>").attr('value', this.val).text(this.text));
        dstAlpha.append($("<option>").attr('value', this.val).text(this.text));
      });
      //
      srcRGB.val('6').change();
      dstRGB.val('7').change();
      srcAlpha.val('1').change();
      dstAlpha.val('7').change();
      //
      $('#srcRGB, #dstRGB, #srcAlpha, #dstAlpha').change(function () {
        let idx = $(this).data('idx');
        newMode[idx] = consts[this.value];
        renderer.updateBlendMode(modeIndex, newMode, equation);
      });
      //
      let equ = $('<select>').attr('id', 'equ').appendTo('body');
      $(list2).each(() => {
        equ.append($("<option>").attr('value', this.val).text(this.text));
      });
      $(equ).on('change', function () {
        equation = equations[this.value];
        renderer.updateBlendMode(modeIndex, newMode, equation);
      });
    }

    update () {
    }

    render () {
    }
  }
})();
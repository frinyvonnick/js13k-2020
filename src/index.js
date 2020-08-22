import { init, Scene, Sprite, GameLoop } from "kontra";

import { MainScene } from './scenes/MainScene.js'

const { canvas } = init();

const scene = new MainScene()

const loop = GameLoop({
  // create the main game loop
  update: function () {
    // update the game state
    scene.update();
  },
  render: function () {
    // render the game state
    scene.render();
  },
});

loop.start(); // start the game

import { init, Sprite, GameLoop, initKeys } from "kontra";

import { makeMainScene } from "./scenes/MainScene.js";

const { canvas } = init();

initKeys();

const mainScene = makeMainScene();
const loop = GameLoop({
  // create the main game loop
  update: function () {
    // update the game state
    mainScene.update();
  },
  render: function () {
    // render the game state
    mainScene.render();
  },
});

loop.start(); // start the game

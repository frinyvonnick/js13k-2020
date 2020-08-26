import { init, Sprite, GameLoop, initKeys } from "kontra";

import { makeMainScene } from "./scenes/MainScene.js";

const { canvas } = init();

initKeys();

makeMainScene().then((scene) => {
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
});

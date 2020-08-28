import { init, initPointer, Sprite, GameLoop, initKeys } from "kontra";

import { makeDesignScene } from "./DesignScene.js";
import { isDesignMode } from "./env";

const { canvas } = init();

initKeys();
initPointer();

console.log("isDesignMode", isDesignMode);

console.log("load entities");
fetch("http://localhost:7000")
  .then((res) => res.json())
  .then(console.log);

Promise.all([makeDesignScene()]).then(([designScene]) => {
  const loop = GameLoop({
    // create the main game loop
    update: function () {
      // update the game state
      designScene.update();
    },
    render: function () {
      // render the game state
      designScene.render();
    },
  });

  loop.start(); // start the game
});

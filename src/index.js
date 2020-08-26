import { init, initPointer, Sprite, GameLoop, initKeys } from "kontra";

import { isDesignMode } from "../utils/env";

import { makeMainScene } from "./scenes/MainScene.js";
import { makeDesignScene } from "../utils/DesignScene.js";

const { canvas } = init();

initKeys();
initPointer();

console.log("isDesignMode", isDesignMode);

console.log("load entities");
fetch("http://localhost:7000")
  .then((res) => res.json())
  .then(console.log);

console.log("save entities");
fetch("http://localhost:7000", {
  method: "POST",
  body: JSON.stringify([{ x: 0, y: 0 }]),
})
  .then((res) => res.text())
  .then(console.log);

Promise.all([makeMainScene(), makeDesignScene()]).then(
  ([mainScene, designScene]) => {
    const loop = GameLoop({
      // create the main game loop
      update: function () {
        // update the game state
        mainScene.update();
        if (isDesignMode) {
          designScene.update();
        }
      },
      render: function () {
        // render the game state
        mainScene.render();
        if (isDesignMode) {
          designScene.render();
        }
      },
    });

    loop.start(); // start the game
  }
);

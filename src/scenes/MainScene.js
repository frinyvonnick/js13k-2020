import { Scene } from "kontra";

import { makeHero } from "../entities/Hero.js";
import { makePlatforms } from "../entities/Platform.js";

import { GameManager } from "../managers/GameManager.js";

export function makeMainScene() {
  return Promise.all([makeHero(), makePlatforms()]).then(
    ([hero, platforms]) => {
      const gameManager = new GameManager();

      return Scene({
        id: "game",
        children: [hero, ...platforms],
        update: function () {
          gameManager.update(hero, platforms);
        },
      });
    }
  );
}

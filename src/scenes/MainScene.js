import { Scene } from "kontra";

import { makeHero } from "../entities/Hero.js";
import { makePlatform } from "../entities/Platform.js";

import { GameManager } from "../managers/GameManager.js";

export function makeMainScene() {
  const hero = makeHero();
  const platform = makePlatform();
  const gameManager = new GameManager();

  return Scene({
    id: "game",
    children: [hero, platform],
    update: function () {
      gameManager.update(hero, [platform]);
      this.children.forEach((child) => child.update());
    },
    render: function () {
      this.children.forEach((child) => child.render());
    },
  });
}

import { Scene } from "kontra";

import { makeHero } from "../entities/Hero.js";
import { makePlatforms } from "../entities/Platform.js";

import { GameManager } from "../managers/GameManager.js";

export function makeMainScene() {
  const hero = makeHero();
  const platforms = makePlatforms();
  const gameManager = new GameManager();

  return Scene({
    id: "game",
    children: [hero, ...platforms],
    update: function () {
      gameManager.update(hero, platforms);
      this.children.forEach((child) => child.update());
    },
    render: function () {
      this.children.forEach((child) => child.render());
    },
  });
}

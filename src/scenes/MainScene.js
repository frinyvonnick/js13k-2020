import { Scene, Sprite } from "kontra";

import { makeHero } from "../entities/Hero.js";
import { makePlatforms } from "../entities/Platform.js";

import * as Ground from "../entities/Ground";
import * as Circle from "../entities/Circle";

import { GameManager } from "../managers/GameManager.js";

import entities from "../../utils/entities.json";

const availableEntities = {
  Ground,
  Circle,
};

export function makeMainScene() {
  return Promise.all([makeHero(), generateSpritesFromEntities()]).then(
    ([hero, sprites]) => {
      const gameManager = new GameManager();

      return Scene({
        id: "game",
        children: [hero, ...sprites],
        update: function () {
          gameManager.update(hero, sprites);
        },
      });
    }
  );
}

function generateSpritesFromEntities() {
  return entities.map((props) => {
    const availableEntity = availableEntities[props.type];
    return Sprite(availableEntity.makeEntity(props));
  });
}

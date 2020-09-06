import { Scene, Sprite } from "kontra";

import { makeHero } from "../entities/Hero.js";

import * as Ground from "../entities/Ground";

import { GameManager } from "../managers/GameManager.js";

import entities from "../../utils/entities.json";

const availableEntities = {
  Ground,
};

export function makeMainScene() {
  const hero = makeHero();
  const sprites = generateSpritesFromEntities();
  const gameManager = new GameManager();

  return Scene({
    id: "game",
    children: [...sprites, hero],
    update: function () {
      gameManager.update(hero, sprites);
    },
  });
}

function generateSpritesFromEntities() {
  return entities.map((props) => {
    const availableEntity = availableEntities[props.type];
    return Sprite(availableEntity.makeEntity(props));
  });
}

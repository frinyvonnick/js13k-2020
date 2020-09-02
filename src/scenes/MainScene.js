import { Scene, Sprite } from "kontra";

import { makeHero } from "../entities/Hero.js";

import * as Ground from "../entities/Ground";
import * as Tree from "../entities/Tree";
import * as Bush from "../entities/Bush";
import * as Hill from "../entities/Hill";
import * as Land from "../entities/Land";
import * as Sequoia from "../entities/Sequoia";
import * as Sky from "../entities/Sky";
import { sortSprites } from "../utils/layers";

import { GameManager } from "../managers/GameManager.js";

import entities from "../../utils/entities.json";

const availableEntities = {
  Ground,
  Tree,
  Bush,
  Hill,
  Land,
  Sequoia,
  Sky,
};

export function makeMainScene() {
  const hero = makeHero();
  const sprites = generateSpritesFromEntities();
  const middlegroundSprites = sprites.filter((sprite) => sprite.group === 2);
  const foregroundSprites = sprites.filter((sprite) => sprite.group === 1);
  const backgroundSprites = sprites.filter((sprite) => sprite.group === 3);
  const collidingSprites = middlegroundSprites.filter((sprite) =>
    ["Ground"].includes(sprite.type)
  );

  const gameManager = new GameManager();

  return Scene({
    id: "game",
    children: [hero, ...sprites].sort(sortSprites),
    update: function () {
      gameManager.update(hero, collidingSprites);
      this.camera.x = hero.x;
      this.camera.y = hero.y;

      foregroundSprites.forEach((sprite) => {
        sprite.dx = hero.dx * 1.5 * -1;
      });
      backgroundSprites.forEach((sprite) => {
        sprite.dx = hero.dx * 0.1;
      });
    },
    render: function () {
      this.children.forEach((child) => child.render());
    },
  });
}

function generateSpritesFromEntities() {
  return entities.map((props) => {
    const availableEntity = availableEntities[props.type];
    return availableEntity.makeEntity(props);
  });
}

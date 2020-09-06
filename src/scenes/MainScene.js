import { Scene, Sprite, keyPressed, Text } from "kontra";

import { makeSplashScreenScene } from './SplashScreen'

import { makeHero } from "../entities/Hero.js";

import * as Ground from "../entities/Ground";
import * as Bounce from "../entities/Bounce";
import * as Tree from "../entities/Tree";
import * as Bush from "../entities/Bush";
import * as Hill from "../entities/Hill";
import * as Land from "../entities/Land";
import * as Sequoia from "../entities/Sequoia";
import * as Sky from "../entities/Sky";
import * as Key from "../entities/Key";
import * as Chest from "../entities/Chest";

import { sortSprites } from "../utils/layers";

import { GameManager } from "../managers/GameManager.js";
import { ObjectManager } from "../managers/ObjectManager.js";

import entities from "../../utils/entities.json";

const availableEntities = {
  Ground,
  Bounce,
  Tree,
  Bush,
  Hill,
  Land,
  Sequoia,
  Sky,
  Key,
  Chest,
};

export function makeMainScene() {
  const hero = makeHero();
  const sprites = generateSpritesFromEntities();
  const middlegroundSprites = sprites.filter((sprite) => sprite.group === 2);
  const foregroundSprites = sprites.filter((sprite) => sprite.group === 1);
  const backgroundSprites = sprites.filter((sprite) => sprite.group === 3);

  const collidingSprites = middlegroundSprites.filter(
    (sprite) =>
      ["Ground", "Bounce"].includes(sprite.type)
  );
  const objects = middlegroundSprites.filter((sprite) =>
    ["Key", "Chest"].includes(sprite.type)
  );

  const gameManager = new GameManager();
  const objectManager = new ObjectManager();

  const scene = Scene({
    id: "game",
    isGameStarted: false,
    children: [],
    onStart: function() {
      this.isGameStarted = true
      this.children = [hero, ...sprites].sort(sortSprites);
    },
    update: function () {
      if (this.isGameStarted) {
        gameManager.update(hero, collidingSprites);
        objectManager.update(hero, objects, {
          removeObject: (object) => {
            const index = objects.findIndex((obj) => obj === object);
            if (index !== -1) {
              objects.splice(index, 1);
              this.removeChild(object);
            }
          },
        });
        this.camera.x = hero.x;
        this.camera.y = hero.y;

        foregroundSprites.forEach((sprite) => {
          sprite.dx = hero.dx * 1.5 * -1;
        });
        backgroundSprites.forEach((sprite) => {
          sprite.dx = hero.dx * 0.1;
        });
      }
    },
    render: function () {
      this.children.forEach((child) => child.render());
    },
  });

  const splashScreenScene = makeSplashScreenScene({ onStart: scene.onStart.bind(scene) })
  scene.addChild(splashScreenScene)

  return scene
}

function generateSpritesFromEntities() {
  return entities.map((props) => {
    const availableEntity = availableEntities[props.type];
    return availableEntity.makeEntity(props);
  });
}

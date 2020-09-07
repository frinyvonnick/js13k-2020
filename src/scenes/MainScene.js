import { Scene, Sprite, keyPressed, Text, collides } from "kontra";

import { makeSplashScreenScene } from "./SplashScreen";
import { makeCreditScreenScene } from "./CreditScreen";

import { makeHero } from "../entities/Hero.js";

import * as Ground from "../entities/Ground";
import * as Bounce from "../entities/Bounce";
import * as Slide from "../entities/Slide";
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

import compressedEntities from "../../utils/entities.json";
import { uncompress } from "../../utils/json";
const entities = uncompress(compressedEntities);

const availableEntities = {
  Ground,
  Bounce,
  Slide,
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
  const sprites = generateSpritesFromEntities();
  const spawn = sprites.find((sprite) => sprite.type === "Spawn");
  const end = sprites.find((sprite) => sprite.type === "End");
  end.opacity = 0;
  const hero = makeHero(spawn);
  const middlegroundSprites = sprites.filter((sprite) => sprite.group === 2);
  const foregroundSprites = sprites.filter((sprite) => sprite.group === 1);
  const backgroundSprites = sprites.filter((sprite) => sprite.group === 3);

  foregroundSprites.forEach((sprite) => {
    sprite.x = sprite.x + hero.x * 1.5 * -1;
  });
  backgroundSprites.forEach((sprite) => {
    sprite.x = sprite.x + hero.x * 0.1;
  });

  const collidingSprites = middlegroundSprites.filter((sprite) =>
    ["Ground", "Bounce", "Slide"].includes(sprite.type)
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
    onStart: function () {
      this.isGameStarted = true;
      this.children = [hero, ...sprites.filter((s) => s.type !== "Spawn")].sort(
        sortSprites
      );
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

        if (
          collides(hero, end) &&
          hero.hasInInventory("Boots") &&
          hero.hasInInventory("Bandana") &&
          hero.hasInInventory("Cloak")
        ) {
          this.children = []
          const creditScreen = makeCreditScreenScene();
          this.addChild(creditScreen);
          this.camera.x = 400
          this.camera.y = 300
        }
      }
    },
    render: function () {
      this.children.forEach((child) => child.render());
    },
  });

  const splashScreenScene = makeSplashScreenScene({
    onStart: scene.onStart.bind(scene),
  });
  scene.addChild(splashScreenScene);

  return scene;
}

function generateSpritesFromEntities() {
  return entities.map((props) => {
    const availableEntity = availableEntities[props.type];
    return Sprite({
      ...props,
      render: availableEntity ? availableEntity.render : undefined,
    });
  });
}

import { Scene, Sprite, keyPressed, Text, collides } from "kontra";

import { makeSplashScreenScene } from "./SplashScreen";
import { makeCreditScreenScene } from "./CreditScreen";

import { makeHero } from "../entities/Hero.js";
import { BOOTS, CLOAK, BANDANA } from "../entities/HeroInventory.js";

import * as Ground from "../entities/Ground";
import * as Bounce from "../entities/Bounce";
import * as Slide from "../entities/Slide";
import * as Fade from "../entities/Fade";
import * as Tree from "../entities/Tree";
import * as Bush from "../entities/Bush";
import * as Hill from "../entities/Hill";
import * as Land from "../entities/Land";
import * as Sequoia from "../entities/Sequoia";
import * as Sky from "../entities/Sky";
import * as Key from "../entities/Key";
import * as Chest from "../entities/Chest";
import * as Tent from "../entities/Tent";
import { drawShaman } from "../entities/Shaman";

import { sortSprites } from "../utils/layers";

import { GameManager } from "../managers/GameManager.js";
import { ObjectManager } from "../managers/ObjectManager.js";
import { makeTextManager } from "../managers/TextManager.js";

import compressedEntities from "../entities-prod.json";
import colors from "../colors.json";
import { uncompress } from "../utils/json";
const entities = uncompress(compressedEntities, colors);

const availableEntities = {
  Ground,
  Bounce,
  Slide,
  Fade,
  Tree,
  Bush,
  Hill,
  Land,
  Sequoia,
  Sky,
  Key,
  Chest,
  Tent,
};

export function makeMainScene() {
  const textManager = makeTextManager();
  const gameManager = new GameManager();
  const objectManager = new ObjectManager(textManager);

  const sprites = generateSpritesFromEntities();

  const end = sprites.find((sprite) => sprite.type === "End");
  end.opacity = 0;
  const shaman = Sprite({
    group: 2,
    zIndex: 1,
    x: end.x + end.width / 2,
    y: end.y + end.height - 38,
    width: 32,
    height: 32,
    scaleX: -1,
    render: drawShaman,
  });

  const middlegroundSprites = sprites.filter((sprite) => sprite.group === 2);
  const foregroundSprites = sprites.filter((sprite) => sprite.group === 1);
  const backgroundSprites = sprites.filter((sprite) => sprite.group === 3);

  const hideSprites = (arr, type) => {
    return arr
      .filter((sprite) => sprite.type === type)
      .map((sprite) => {
        sprite.opacity = 0;
        return sprite;
      });
  };

  const bounces = hideSprites(middlegroundSprites, "Bounce");
  const slides = hideSprites(middlegroundSprites, "Slide");
  const fades = hideSprites(middlegroundSprites, "Fade");
  const collidingSprites = [
    ...middlegroundSprites.filter((sprite) => ["Ground"].includes(sprite.type)),
    ...bounces,
    ...slides,
    ...fades,
  ].sort((a, b) => b.y - a.y);
  const objects = middlegroundSprites.filter((sprite) =>
    ["Key", "Chest"].includes(sprite.type)
  );

  const hero = makeHero({
    textManager,
    onPick: function (newItem) {
      const show = (platform) => {
        platform.opacity = 1;
      };
      if (newItem === BANDANA) {
        bounces.forEach(show);
      } else if (newItem === BOOTS) {
        slides.forEach(show);
      } else if (newItem === CLOAK) {
        fades.forEach(show);
      }
    },
  });

  foregroundSprites.forEach((sprite) => {
    sprite.x = sprite.x + hero.x * 1.5 * -1;
  });
  backgroundSprites.forEach((sprite) => {
    sprite.x = sprite.x + hero.x * 0.1;
  });

  const scene = Scene({
    id: "game",
    isGameStarted: false,
    children: [],
    onStart: function () {
      this.isGameStarted = true;
      this.children = [
        hero,
        ...sprites.filter((s) => s.type !== "Spawn"),
        shaman,
      ].sort(sortSprites);
      this.addChild(textManager);

      // This setTimeout prevent skipping the first message after the splash screen
      setTimeout(() => {
        textManager.displayText(
          "I killed the monster that attacked our village. He stoles our colors.",
          () => {
            textManager.displayText(
              "I'm stuck in the forest, find them and come rescue me.",
              () => {
                textManager.displayText(
                  "Move with 'A', 'D' and jump with 'Space'"
                );
              }
            );
          }
        );
      }, 500);
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
        this.camera.y = hero.y - 150;

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
          hero.hasInInventory("Cloak") &&
          !this.isEnd
        ) {
          this.isEnd = true;
          textManager.displayText(
            "Thank you for saving me hero!",
            () => {
              this.children = [];
              const creditScreen = makeCreditScreenScene();
              this.addChild(creditScreen);
              this.isCredit = true;
            },
            true
          );
        }
        if (this.isCredit) {
          this.camera.x = 400;
          this.camera.y = 300;
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
      update: availableEntity ? availableEntity.update : undefined,
    });
  });
}

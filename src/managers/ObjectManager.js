import { collides } from "kontra";

import { KEY, BOOTS, BANDANA, CLOAK } from "../entities/HeroInventory";

export const CHEST = "Chest";
const TEXTS = {
  [BOOTS]: "1",
  [BANDANA]: "1",
  [CLOAK]: "1",
};

export class ObjectManager {
  constructor(textManager) {
    this.textManager = textManager;
  }
  update(hero, objects, { removeObject }) {
    objects.forEach((object) => {
      if (collides(hero, object)) {
        if (object.type === KEY) {
          hero.addToInventory(KEY);
          removeObject(object);
        } else if (
          object.type === CHEST &&
          !object.opened &&
          hero.hasInInventory(KEY)
        ) {
          hero.removeFromInventory(KEY);
          hero.addToInventory(object.content);
          object.opened = true;
          this.textManager.displayText(TEXTS[object.content]);
        }
      }
    });
  }
}

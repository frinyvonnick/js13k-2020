import { collides } from "kontra";

import { KEY } from '../entities/HeroInventory'

export const CHEST = 'Chest'

export class ObjectManager {
  update(hero, objects, { removeObject }) {
    objects.forEach((object) => {
      if (collides(hero, object)) {
        if (object.type === KEY) {
          hero.addToInventory(KEY)
          removeObject(object)
        } else if (object.type === CHEST && !object.opened && hero.hasInInventory(KEY)) {
          hero.removeFromInventory(KEY)
          hero.addToInventory(object.content)
          object.opened = true
        }
      }
    })
  }
}

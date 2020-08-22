import { Sprite, collides } from "kontra";

export class GameManager {
  update(hero, objects) {
    const futureFrame = new Sprite({ ...hero })

    futureFrame.advance()

    objects.forEach(object => {
      if (collides(futureFrame, object)) {
        if (doesHeroComeFromTopOrBottom(hero, object)) {
          if (doesHeroComeFromTop(hero, object)) {
            preventHeroFromFalling(hero, object)
          }
        }
      }
    })
  }
}

function doesHeroComeFromTopOrBottom(hero, object) {
  return hero.x + hero.width > object.x && hero.x < object.x + object.width
}

function doesHeroComeFromTop(hero, object) {
  return hero.y < object.y
}

function preventHeroFromFalling(hero, object) {
  hero.isGrounded = true
  hero.y = object.y - hero.height
  hero.dy = 0
}

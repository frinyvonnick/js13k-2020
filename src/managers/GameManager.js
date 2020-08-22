import { Sprite, collides } from "kontra";

export class GameManager {
  update(hero, objects) {
    const futureFrame = new Sprite({ ...hero });

    futureFrame.advance();

    objects.forEach((object) => {
      if (collides(futureFrame, object)) {
        if (doesHeroComeFromTopOrBottom(hero, object)) {
          if (doesHeroComeFromTop(hero, object)) {
            preventHeroFromFalling(hero, object);
          } else {
            preventHeroFromGoingUpper(hero, object);
          }
        } else {
          if (doesHeroComeFromRight(hero, object)) {
            const heroBottomYAtCollisionTime = getBottomLeftFromHeroAtCollisionTime(
              hero,
              futureFrame,
              object
            );
            const heroTopYAtCollisionTime = getBottomLeftFromHeroAtCollisionTime(
              hero,
              futureFrame,
              object
            );
            if (heroBottomYAtCollisionTime >= object.y) {
              preventHeroFromFalling(hero, object);
            } else if (heroTopYAtCollisionTime < object.y + object.height) {
              preventHeroFromGoingUpper(hero, object);
            } else {
              preventHeroFromGoingLeft(hero, object);
            }
          } else {
            const heroYAtCollisionTime = getBottomRightFromHeroAtCollisionTime(
              hero,
              futureFrame,
              object
            );
            const heroTopYAtCollisionTime = getBottomRightFromHeroAtCollisionTime(
              hero,
              futureFrame,
              object
            );
            if (heroBottomYAtCollisionTime >= object.y) {
              preventHeroFromFalling(hero, object);
            } else if (heroTopYAtCollisionTime < object.y + object.height) {
              preventHeroFromGoingUpper(hero, object);
            } else {
              preventHeroFromGoingRight(hero, object);
            }
          }
        }
      }
    });
  }
}

function getTopLeftFromHeroAtCollisionTime(hero, futureFrame, object) {
  const xa = hero.x;
  const ya = hero.y;

  const xb = futureFrame.x;
  const yb = futureFrame.y;

  return getContactYWithLinearFunction(
    { xa, ya },
    { xb, yb },
    object.x + object.width
  );
}

function getTopRightFromHeroAtCollisionTime(hero, futureFrame, object) {
  const xa = hero.x + hero.width;
  const ya = hero.y;

  const xb = futureFrame.x + futureFrame.width;
  const yb = futureFrame.y;

  return getContactYWithLinearFunction({ xa, ya }, { xb, yb }, object.x);
}

function getBottomLeftFromHeroAtCollisionTime(hero, futureFrame, object) {
  const xa = hero.x;
  const ya = hero.y + hero.height;

  const xb = futureFrame.x;
  const yb = futureFrame.y + futureFrame.height;

  return getContactYWithLinearFunction(
    { xa, ya },
    { xb, yb },
    object.x + object.width
  );
}

function getBottomRightFromHeroAtCollisionTime(hero, futureFrame, object) {
  const xa = hero.x + hero.width;
  const ya = hero.y + hero.height;

  const xb = futureFrame.x + futureFrame + width;
  const yb = futureFrame.y + futureFrame.height;

  return getContactYWithLinearFunction({ xa, ya }, { xb, yb }, object.x);
}

function getContactYWithLinearFunction({ xa, ya }, { xb, yb }, contactX) {
  const a = (yb - ya) / (xb - xa);
  const b = ya - a * xa;
  return a * contactX + b;
}

function doesHeroComeFromTopOrBottom(hero, object) {
  return hero.x + hero.width > object.x && hero.x < object.x + object.width;
}

function doesHeroComeFromTop(hero, object) {
  return hero.y < object.y;
}

function doesHeroComeFromRight(hero, object) {
  return hero.x < object.x + object.width;
}

function preventHeroFromFalling(hero, object) {
  hero.isGrounded = true;
  hero.y = object.y - hero.height;
  hero.dy = 0;
}

function preventHeroFromGoingUpper(hero, object) {
  hero.y = object.y + object.height;
  hero.dy = 0;
}

function preventHeroFromGoingLeft(hero, object) {
  hero.x = object.x + object.width;
  hero.dx = 0;
}

function preventHeroFromGoingRight(hero, object) {
  hero.x = object.x - hero.width;
  hero.dx = 0;
}

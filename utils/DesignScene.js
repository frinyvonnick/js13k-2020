import { Scene, Sprite, getPointer, onPointerDown, Vector } from "kontra";

import * as Ground from "../src/entities/Ground";

export function makeDesignScene() {
  return Promise.all([]).then(([]) => {
    const sprite = Ground.makeEntity({
      ...Ground.defaultValues,
      anchor: { x: 0.5, y: 0.5 },
    });

    const scene = Scene({
      id: "game",
      children: [sprite],
      update: () => {
        const pointer = getPointer();
        sprite.x = pointer.x;
        sprite.y = pointer.y;
      },
    });

    onPointerDown(function (e, object) {
      const { x, y } = getPointer();
      scene.addChild(cloneSprite(sprite));
      console.log("click", { x, y });
    });

    return scene;
  });
}

function cloneSprite(sprite) {
  const clonedSprite = new Sprite({ ...sprite });
  clonedSprite.position = Vector(sprite.position.x, sprite.position.y);
  return clonedSprite;
}

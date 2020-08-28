import { Scene, Sprite, getPointer, onPointerDown } from "kontra";

import * as Ground from "../src/entities/Ground";

export function makeDesignScene() {
  return Promise.all([]).then(([]) => {
    const sprite = Ground.makeEntity({
      ...Ground.defaultValues,
      anchor: { x: 0.5, y: 0.5 },
    });

    onPointerDown(function (e, object) {
      const { x, y } = getPointer();
      console.log("click", { x, y });
    });

    return Scene({
      id: "game",
      children: [sprite],
      update: () => {
        const pointer = getPointer();
        sprite.x = pointer.x;
        sprite.y = pointer.y;
      },
    });
  });
}

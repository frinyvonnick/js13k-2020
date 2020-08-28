import {
  Scene,
  Sprite,
  getPointer,
  onPointerDown,
  Vector,
  keyPressed,
} from "kontra";

import * as Ground from "../src/entities/Ground";

export function makeDesignScene() {
  return Promise.all([load()]).then(([savedEntities]) => {
    const entities = [...savedEntities];

    const sprite = Ground.makeEntity(Ground.defaultValues);

    const scene = Scene({
      id: "game",
      children: [sprite],
      hasPressedSave: false,
      update: function() {
        const pointer = getPointer();
        sprite.x = pointer.x;
        sprite.y = pointer.y;

        if (keyPressed("s")) {
          this.hasPressedSave = true;
        } else if (this.hasPressedSave) {
          this.hasPressedSave = false;
          save(entities);
        }
      },
    });

    entities.forEach(entity => scene.addChild(new Sprite({ ...entity })));
    onPointerDown(function (e, object) {
      const { x, y } = getPointer();
      scene.addChild(cloneSprite(sprite));
      entities.push({ ...Ground.defaultValues, x, y });
    });

    return scene;
  });
}

function cloneSprite(sprite) {
  const clonedSprite = new Sprite({ ...sprite });
  clonedSprite.position = Vector(sprite.position.x, sprite.position.y);
  return clonedSprite;
}

function save(entities) {
  fetch("http://localhost:7000", {
    method: "POST",
    body: JSON.stringify(entities),
  })
    .then((res) => res.text())
    .then(console.log);
}

function load() {
  return fetch("http://localhost:7000")
  .then((res) => res.json())
}

import { v4 as uuidv4 } from "uuid";
import {
  Scene,
  Sprite,
  getPointer,
  onPointerDown,
  Vector,
  keyPressed,
  track,
} from "kontra";

import * as Ground from "../src/entities/Ground";

export function makeDesignScene() {
  return Promise.all([load()]).then(([savedEntities]) => {
    let entities = [...savedEntities];

    const sprite = Ground.makeEntity(Ground.defaultValues);

    const scene = Scene({
      id: "game",
      children: [sprite],
      hasPressedSave: false,
      isEditMode: false,
      selectedSprite: null,
      update: function () {
        const pointer = getPointer();
        sprite.x = pointer.x;
        sprite.y = pointer.y;

        if (keyPressed("s")) {
          this.hasPressedSave = true;
        } else if (this.hasPressedSave) {
          this.hasPressedSave = false;
          save(entities);
        }

        if (keyPressed("e")) {
          this.isEditMode = true;
        }

        if (keyPressed("a")) {
          this.isEditMode = false;
          this.selectedSprite = null;
          document.querySelector("form").remove();
        }

        if (this.isEditMode && this.selectedSprite && keyPressed("d")) {
          this.removeChild(this.selectedSprite);
          entities = entities.filter(
            (entity) => entity.id !== this.selectedSprite.id
          );
          this.selectedSprite = null;
          document.querySelector("form").remove();
        }

        const spriteToAdd = this.children.find((child) => !child.id);

        if (this.isEditMode) {
          spriteToAdd.opacity = 0;
        } else {
          spriteToAdd.opacity = 1;
        }
      },
    });

    function selectSprite() {
      if (scene.isEditMode) {
        scene.selectedSprite = this;

        const alreadyExistingForm = document.querySelector("form")
        if (alreadyExistingForm) {
          alreadyExistingForm.remove();
        }

        const form = document.createElement("form");

        form.style.backgroundColor = "#ddd";

        Object.keys(Ground.defaultValues).forEach((field) => {
          const group = document.createElement("div");

          const label = document.createElement("label");
          label.innerHTML = field;

          const input = document.createElement("input");
          input.value = this[field]
          input.oninput = function(e) {
            const value = e.target.value
            scene.selectedSprite[field] = value
            entities.find(entity => entity.id === scene.selectedSprite.id)[field] = value
          }

          group.appendChild(label);
          group.appendChild(input);
          form.appendChild(group);
        });

        document.body.appendChild(form);
      }
    }

    entities.forEach((entity) => {
      const newSprite = makeSprite(entity, selectSprite);
      scene.addChild(newSprite);
      entity.id = newSprite.id;
    });

    onPointerDown(function (e, object) {
      if (!scene.isEditMode) {
        const { x, y } = getPointer();
        const newSprite = cloneSprite(sprite, selectSprite);
        scene.addChild(newSprite);
        entities.push({ ...Ground.defaultValues, x, y, id: newSprite.id });
      }
    });

    return scene;
  });
}

function makeSprite(props, onDown) {
  const newSprite = new Sprite({ ...props, id: uuidv4(), onDown });
  track(newSprite);
  return newSprite;
}

function cloneSprite(sprite, onDown) {
  const clonedSprite = makeSprite(sprite, onDown);
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
  return fetch("http://localhost:7000").then((res) => res.json());
}

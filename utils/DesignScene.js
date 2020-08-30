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
import * as Circle from "../src/entities/Circle";

const availableEntities = {
  Ground,
  Circle,
};

const availableEntityTypes = Object.keys(availableEntities);

export function makeDesignScene() {
  return Promise.all([load()]).then(([savedEntities]) => {
    let entities = [...savedEntities];

    const firstAvailableEntity = availableEntities[availableEntityTypes[0]];
    const sprite = firstAvailableEntity.makeEntity(
      firstAvailableEntity.defaultValues
    );

    const scene = Scene({
      id: "game",
      children: [sprite],
      hasPressedSave: false,
      isEditMode: false,
      selectedSprite: null,
      selectedAvailableEntityIndex: 0,
      getSpriteToAdd: function () {
        return this.children.find((child) => !child.id);
      },
      changeSelectedAvailableEntity: function () {
        this.removeChild(this.getSpriteToAdd());
        const availableEntity =
          availableEntities[
            availableEntityTypes[this.selectedAvailableEntityIndex]
          ];
        const newSpriteToAdd = availableEntity.makeEntity(
          availableEntity.defaultValues
        );
        this.addChild(newSpriteToAdd);
      },
      update: function () {
        const pointer = getPointer();
        const spriteToAdd = this.getSpriteToAdd();
        spriteToAdd.x = pointer.x;
        spriteToAdd.y = pointer.y;

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

        if (keyPressed("n")) {
          if (
            this.selectedAvailableEntityIndex + 1 <
            availableEntityTypes.length
          ) {
            this.selectedAvailableEntityIndex++;
            this.changeSelectedAvailableEntity();
          }
        }

        if (keyPressed("p")) {
          if (this.selectedAvailableEntityIndex - 1 >= 0) {
            this.selectedAvailableEntityIndex--;
            this.changeSelectedAvailableEntity();
          }
        }

        if (this.isEditMode && this.selectedSprite && keyPressed("d")) {
          this.removeChild(this.selectedSprite);
          entities = entities.filter(
            (entity) => entity.id !== this.selectedSprite.id
          );
          this.selectedSprite = null;
          document.querySelector("form").remove();
        }

        if (this.isEditMode) {
          spriteToAdd.opacity = 0;
        } else {
          spriteToAdd.opacity = 1;
        }
      },
    });

    function selectSprite() {
      console.log('selectedSprite', this.id)
      if (scene.isEditMode) {
        scene.selectedSprite = this;

        const alreadyExistingForm = document.querySelector("form");
        if (alreadyExistingForm) {
          alreadyExistingForm.remove();
        }

        const form = document.createElement("form");

        form.style.backgroundColor = "#ddd";

        Object.keys(availableEntities[this.type].defaultValues).forEach((field) => {
          const group = document.createElement("div");

          const label = document.createElement("label");
          label.innerHTML = field;

          const input = document.createElement("input");
          input.value = this[field];
          input.oninput = function (e) {
            const value = e.target.value;
            scene.selectedSprite[field] = value;
            entities.find((entity) => entity.id === scene.selectedSprite.id)[
              field
            ] = value;
          };

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
        const newSprite = cloneSprite(scene.getSpriteToAdd(), selectSprite);
        scene.addChild(newSprite);
        const type = availableEntityTypes[scene.selectedAvailableEntityIndex];
        const entity = availableEntities[type];
        entities.push({
          ...entity.defaultValues,
          x,
          y,
          id: newSprite.id,
          type,
        });
      }
    });

    return scene;
  });
}

function makeSprite(props, onDown) {
  const entity = availableEntities[props.type];
  const newSprite = new Sprite({
    ...entity.makeEntity(props),
    id: uuidv4(),
    render: entity.render,
    update: entity.update,
    onDown,
  });
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

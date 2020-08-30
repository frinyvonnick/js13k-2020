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

const CAMERA_SPEED = 10;
const ZOOM_SPEED = 0.95;
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
      hasPressed: {},
      isEditMode: false,
      isRoundedPlacement: false,
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
        spriteToAdd.x = (pointer.x + this.sx) / this.scaleX;
        spriteToAdd.y = (pointer.y + this.sy) / this.scaleX;

        if (this.isRoundedPlacement) {
          spriteToAdd.x = Math.round(spriteToAdd.x);
          spriteToAdd.y = Math.round(spriteToAdd.y);
        }

        if (this.isEditMode) {
          spriteToAdd.opacity = 0;
        } else {
          spriteToAdd.opacity = 1;
        }

        onRelease(this, "s", () => {
          save(entities);
        });

        onRelease(this, "e", () => {
          this.isEditMode = true;
        });

        onRelease(this, "a", () => {
          switchToAddMode();
        });

        onRelease(this, "n", () => {
          selectNextEntity();
        });

        onRelease(this, "p", () => {
          selectPreviousEntity();
        });

        onRelease(this, "c", () => {
          if (this.isEditMode)
            this.isRoundedPlacement = !this.isRoundedPlacement;
        });

        const MOVE_SPEED = CAMERA_SPEED / this.scaleX;
        if (keyPressed("left")) {
          this.camera.x -= MOVE_SPEED;
          console.log("scale : ", this.scaleX, "cam speed : ", MOVE_SPEED);
        }

        if (keyPressed("up")) {
          this.camera.y -= MOVE_SPEED;
        }

        if (keyPressed("right")) {
          this.camera.x += MOVE_SPEED;
        }

        if (keyPressed("down")) {
          this.camera.y += MOVE_SPEED;
        }

        if (keyPressed("i")) {
          this.scaleX *= ZOOM_SPEED;
          this.scaleY *= ZOOM_SPEED;
        }

        if (keyPressed("o")) {
          this.scaleX /= ZOOM_SPEED;
          this.scaleY /= ZOOM_SPEED;
        }

        if (this.isEditMode && this.selectedSprite && keyPressed("d")) {
          removeSelectedSprite();
        }
      },
    });

    entities.forEach((entity) => {
      const newSprite = makeSprite(entity, selectSprite);
      scene.addChild(newSprite);
      entity.id = newSprite.id;
    });

    onPointerDown(pasteSpriteToScene);

    function pasteSpriteToScene(e, object) {
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
    }

    function switchToAddMode() {
      scene.isEditMode = false;
      scene.selectedSprite = null;
      removeSpriteDetailsForm();
    }

    function selectNextEntity() {
      if (
        !scene.isEditMode &&
        scene.selectedAvailableEntityIndex + 1 < availableEntityTypes.length
      ) {
        scene.selectedAvailableEntityIndex++;
        scene.changeSelectedAvailableEntity();
      }
    }

    function selectPreviousEntity() {
      if (!scene.isEditMode && scene.selectedAvailableEntityIndex - 1 >= 0) {
        scene.selectedAvailableEntityIndex--;
        scene.changeSelectedAvailableEntity();
      }
    }

    function removeSpriteDetailsForm() {
      const alreadyExistingForm = document.querySelector("form");
      if (alreadyExistingForm) {
        alreadyExistingForm.remove();
      }
    }

    function removeSelectedSprite() {
      scene.removeChild(scene.selectedSprite);
      entities = entities.filter(
        (entity) => entity.id !== scene.selectedSprite.id
      );
      scene.selectedSprite = null;
      removeSpriteDetailsForm();
    }

    function selectSprite() {
      console.log("selectedSprite", this.id);
      if (scene.isEditMode) {
        scene.selectedSprite = this;

        createSpriteDetailsForm();
      }
    }

    function createSpriteDetailsForm() {
      removeSpriteDetailsForm();
      const form = document.createElement("form");

      form.style.backgroundColor = "#ddd";

      Object.keys(availableEntities[this.type].defaultValues).forEach(
        (field) => {
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
        }
      );

      document.body.appendChild(form);
    }

    return scene;
  });
}

function onRelease(scene, key, cb) {
  if (keyPressed(key)) {
    scene.hasPressed[key] = true;
  } else if (scene.hasPressed[key]) {
    scene.hasPressed[key] = false;
    cb();
  }
}

function makeSprite(props, onDown) {
  const entity = availableEntities[props.type];
  const newSprite = new Sprite({
    ...entity.makeEntity(props),
    id: uuidv4(),
    render: entity.render,
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

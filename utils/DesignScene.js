import { v4 as uuidv4 } from "uuid";
import {
  Scene,
  Sprite,
  getPointer,
  onPointerDown,
  Vector,
  keyPressed,
  track,
  pointerPressed,
  pointerOver,
} from "kontra";

import * as Ground from "../src/entities/Ground";
import * as Tree from "../src/entities/Tree";
import * as Bush from "../src/entities/Bush";
import * as Hill from "../src/entities/Hill";
import * as Land from "../src/entities/Land";
import * as Sequoia from "../src/entities/Sequoia";
import * as Sky from "../src/entities/Sky";
import { sortSprites } from "../src/utils/layers";

const CAMERA_SPEED = 10;
const ZOOM_SPEED = 0.95;
const availableEntities = {
  Ground,
  Tree,
  Bush,
  Hill,
  Land,
  Sequoia,
  Sky,
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
      pressedFrames: 0,
      hasPressed: {},
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
      handleEntitiesDragging(pointer) {
        if (
          this.isEditMode &&
          pointerPressed("left") &&
          pointerOver(this.selectedSprite)
        ) {
          if (this.pressedFrames > 10) {
            this.hasPressed["left"] = true;
          }
          this.pressedFrames++;
        }

        if (this.hasPressed["left"] && pointerPressed("left")) {
          this.selectedSprite.x = Math.round(
            (pointer.x + this.sx) / this.scaleX
          );
          this.selectedSprite.y = Math.round(
            (pointer.y + this.sy) / this.scaleX
          );
        }

        if (this.hasPressed["left"] && !pointerPressed("left")) {
          this.hasPressed["left"] = false;
          this.pressedFrames = 0;

          updateSpriteDetailsForm(this.selectedSprite);
          const selectedEntity = entities.find(
            (entity) => entity.id === this.selectedSprite.id
          );
          selectedEntity.x = this.selectedSprite.x;
          selectedEntity.y = this.selectedSprite.y;
        }
      },
      update: function () {
        const pointer = getPointer();
        const spriteToAdd = this.getSpriteToAdd();
        spriteToAdd.x = Math.round((pointer.x + this.sx) / this.scaleX);
        spriteToAdd.y = Math.round((pointer.y + this.sy) / this.scaleX);

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

        const moveSpeed = CAMERA_SPEED / this.scaleX;
        if (keyPressed("left")) {
          this.camera.x -= moveSpeed;
        }

        if (keyPressed("up")) {
          this.camera.y -= moveSpeed;
        }

        if (keyPressed("right")) {
          this.camera.x += moveSpeed;
        }

        if (keyPressed("down")) {
          this.camera.y += moveSpeed;
        }

        if (keyPressed("i")) {
          this.scaleX *= ZOOM_SPEED;
          this.scaleY *= ZOOM_SPEED;
        }

        if (keyPressed("o")) {
          this.scaleX /= ZOOM_SPEED;
          this.scaleY /= ZOOM_SPEED;
        }

        this.handleEntitiesDragging(pointer);

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
    scene.children.sort(sortSprites);

    onPointerDown(pasteSpriteToScene);

    function pasteSpriteToScene(e, object) {
      if (!scene.isEditMode) {
        const { x, y } = getPointer();
        const newSprite = cloneSprite(scene.getSpriteToAdd(), selectSprite);
        scene.addChild(newSprite);
        scene.children.sort(sortSprites);
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
      scene.children = scene.children.sort(sortSprites);
      entities = entities.filter(
        (entity) => entity.id !== scene.selectedSprite.id
      );
      scene.selectedSprite = null;
      removeSpriteDetailsForm();
    }

    function selectSprite() {
      if (scene.isEditMode) {
        scene.selectedSprite = this;

        createSpriteDetailsForm(this);
      }
    }

    function createSpriteDetailsForm(sprite) {
      removeSpriteDetailsForm();
      const form = document.createElement("form");

      form.style.backgroundColor = "#ddd";

      Object.keys(availableEntities[sprite.type].defaultValues).forEach(
        (field) => {
          const group = document.createElement("div");

          const label = document.createElement("label");
          label.innerHTML = field;

          const input = document.createElement("input");
          input.value = sprite[field];
          input.name = field;
          input.oninput = function (e) {
            const value = Number.isNaN(Number.parseFloat(e.target.value))
              ? e.target.value
              : Number.parseFloat(e.target.value);

            const selectedEntity = entities.find(
              (entity) => entity.id === scene.selectedSprite.id
            );
            selectedEntity[field] = value;

            refreshSelectedSprite(selectedEntity);
          };

          group.appendChild(label);
          group.appendChild(input);
          form.appendChild(group);
        }
      );

      document.body.appendChild(form);
    }
    function refreshSelectedSprite(selectedEntity) {
      // This refresh enables optimization at sprite initialization
      const updatedSprite = makeSprite(selectedEntity, selectSprite);
      scene.addChild(updatedSprite);
      scene.removeChild(scene.selectedSprite);
      scene.selectedSprite = updatedSprite;
      scene.children.sort(sortSprites);
      updateSpriteDetailsForm(scene.selectedSprite);
    }

    function updateSpriteDetailsForm(sprite) {
      Object.keys(availableEntities[sprite.type].defaultValues).forEach(
        (field) => {
          const input = document.querySelector(`input[name=${field}]`);
          input.value = sprite[field];
        }
      );
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
    id: props.id || uuidv4(),
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

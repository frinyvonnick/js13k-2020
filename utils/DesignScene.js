import { v4 as uuidv4 } from "uuid";
import { compress, uncompress } from "./json";
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

import * as Ground from "./entities/Ground";
import * as Bounce from "./entities/Bounce";
import * as Slide from "./entities/Slide";
import * as Tree from "./entities/Tree";
import * as Bush from "./entities/Bush";
import * as Hill from "./entities/Hill";
import * as Land from "./entities/Land";
import * as Sequoia from "./entities/Sequoia";
import * as Sky from "./entities/Sky";
import * as Key from "./entities/Key";
import * as Chest from "./entities/Chest";
import * as Spawn from "./entities/Spawn";
import * as End from "./entities/End";

import { sortSprites } from "../src/utils/layers";

const CAMERA_SPEED = 10;
const ZOOM_SPEED = 0.95;
const availableEntities = {
  Ground,
  Bounce,
  Slide,
  Tree,
  Bush,
  Hill,
  Land,
  Sequoia,
  Sky,
  Key,
  Chest,
  Spawn,
  End,
};

const availableEntityTypes = Object.keys(availableEntities);

export function makeDesignScene() {
  return Promise.all([load()]).then(([savedEntities]) => {
    let entities = [...savedEntities];

    const firstAvailableEntity = availableEntities[availableEntityTypes[0]];
    const sprite = firstAvailableEntity.makeEntity(
      firstAvailableEntity.defaultValues
    );

    const foreground = Scene({
      id: "foreground",
      group: 1,
      type: "Scene",
      cullObjects: false,
      children: [],
    });

    const background = Scene({
      id: "background",
      group: 3,
      type: "Scene",
      cullObjects: false,
      children: [],
    });

    const scene = Scene({
      id: "game",
      cullObjects: false,
      children: [sprite, foreground, background],
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
          this.hasPressed["left"] = true;
          this.pressedFrames++;
        }

        if (
          this.hasPressed["left"] &&
          pointerPressed("left") &&
          this.pressedFrames > 12
        ) {
          let offsetX = 0;
          if (this.selectedSprite.group === 1) {
            offsetX = foreground.x;
          } else if (this.selectedSprite.group === 3) {
            offsetX = background.x;
          }

          this.selectedSprite.x = Math.round(
            (pointer.x + this.sx) / this.scaleX - offsetX
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
      render: function () {
        this.children
          .filter((child) => child.type === "Scene")
          .forEach((s) => s.render());
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
          // Déplacer les scenes back et foreground
          this.camera.x -= moveSpeed;
          foreground.x -= moveSpeed * 1.5 * -1;
          background.x -= moveSpeed * 0.1;
        }

        if (keyPressed("up")) {
          this.camera.y -= moveSpeed;
        }

        if (keyPressed("right")) {
          // Déplacer les scenes back et foreground
          this.camera.x += moveSpeed;
          foreground.x += moveSpeed * 1.5 * -1;
          background.x += moveSpeed * 0.1;
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
      addToRightScene(newSprite);
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
        entities.push(
          entity.computeProps({
            ...entity.defaultValues,
            x,
            y,
            id: newSprite.id,
            type,
          })
        );
      }
    }

    function addToRightScene(newSprite) {
      if (newSprite.group === 1) {
        foreground.addChild(newSprite);
        foreground.children.sort(sortSprites);
      } else if (newSprite.group === 3) {
        background.addChild(newSprite);
        background.children.sort(sortSprites);
      } else {
        scene.addChild(newSprite);
        scene.children.sort(sortSprites);
      }
    }

    function removeFromRightScene(spriteToDelete) {
      if (spriteToDelete.group === 1) {
        foreground.removeChild(spriteToDelete);
      } else if (spriteToDelete.group === 3) {
        background.removeChild(spriteToDelete);
      } else {
        scene.removeChild(spriteToDelete);
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
      removeFromRightScene(scene.selectedSprite);
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

            const selectedEntityIndex = entities.findIndex(
              (entity) => entity.id === scene.selectedSprite.id
            );
            const selectedEntity = entities[selectedEntityIndex];
            selectedEntity[field] = value;
            entities[selectedEntityIndex] = availableEntities[
              selectedEntity.type
            ].computeProps(entities[selectedEntityIndex]);

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
      // TODO supprimer dans la bonne scene et ajouter dans la bonne
      const updatedSprite = makeSprite(selectedEntity, selectSprite);
      addToRightScene(updatedSprite);
      removeFromRightScene(scene.selectedSprite);
      scene.selectedSprite = updatedSprite;
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
    body: compress(entities),
  })
    .then((res) => res.text())
    .then(console.log);
}

function load() {
  return fetch("http://localhost:7000")
    .then((res) => res.text())
    .then((json) => uncompress(json));
}

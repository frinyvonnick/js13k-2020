import { Sprite, SpriteSheet, keyPressed, clamp } from "kontra";

import animations from "./animations.json";
import drawHero from "./HeroAnimation";
import { CLOAK, BOOTS } from "./HeroInventory";

const MAX_FALL_SPEED = 10;
const MOVEMENT_SPEED = 3;
const MAX_MOVEMENT_SPEED = 4;
const MOVEMENT_ACCELERATION = 0.4;
const SLIDING_MOVEMENT_ACCELERATION = 0.1;
const MOVEMENT_FRICTION = 0.5;
const AIR_MOVEMENT_FRICTION = 0.1;
const SLIDING_MOVEMENT_FRICTION = 0.02;
const JUMP_SPEED = 8;
const MAX_JUMP_SPEED = 20;
const DOUBLE_JUMP_SPEED = 10;
const MIN_JUMP_FRAMES = 4;
const MAX_JUMP_FRAMES = 15;
const GRAVITY = 0.6;
const GLIDE_SPEED = 0.2;

export function makeHero({ onPick, textManager }) {
  const hero = Sprite({
    group: 2,
    zIndex: 3,
    anchor: { x: 0.5, y: 0.5 },
    x: -1434,
    y: 423,
    width: 10,
    height: 112 / 3,
    dx: 0,
    // Inventory
    inventory: [],
    hasInInventory: function (object) {
      const objectIndex = this.inventory.findIndex((obj) => obj === object);
      return objectIndex !== -1;
    },
    addToInventory: function (object) {
      this.inventory.push(object);
      onPick(object);
    },
    removeFromInventory: function (object) {
      const objectIndex = this.inventory.findIndex((obj) => obj === object);
      this.inventory.splice(objectIndex, 1);
    },
    // Animations
    _a: 0,
    _f: 0,
    _currentAnimation: "run",
    _availableAnimations: animations,
    playCanvasAnimation: function (name) {
      if (name !== this._currentAnimation) {
        this._f = 0;
        this._a = 0;
        this._currentAnimation = name;
      }
    },
    // children: [animationSprite],
    jumpFrames: 0,
    isGrounded: false,
    isJumping: false,
    stillJumping: false,
    hasDoubleJump: false,
    isSliding: false,
    render: function () {
      let frame = this._availableAnimations[this._currentAnimation].frames[
        this._f
      ];
      drawHero.bind(this)(frame, this._f);
    },
    updateAnimation: function (dt = 1 / 60) {
      // Code from Kontra : https://github.com/straker/kontra/blob/main/src/animation.js#L125
      this._a += dt;

      // update to the next frame if it's time
      const currentAnimation = this._availableAnimations[
        this._currentAnimation
      ];
      while (this._a * currentAnimation.frameRate >= 1) {
        this._f = ++this._f % currentAnimation.frames.length;
        this._a -= 1 / currentAnimation.frameRate;
      }
    },
    isPerformingJump: function () {
      // QOL : Allows player to jump off a cliff a few frames too late
      return this.jumpFrames < MIN_JUMP_FRAMES && keyPressed("space");
    },
    isStillAscending: function () {
      return (
        this.isJumping &&
        (this.jumpFrames < MIN_JUMP_FRAMES ||
          (this.jumpFrames < MAX_JUMP_FRAMES && this.stillJumping))
      );
    },
    canDoubleJump: function () {
      return !this.stillJumping && this.hasDoubleJump;
    },
    isBreakingFall: function () {
      return this.dy > GRAVITY && keyPressed("space");
    },
    handleJump: function () {
      if (this.isPerformingJump()) {
        this.isJumping = true;
        this.stillJumping = true;
      }
      if (this.isStillAscending()) {
        this.dy = -JUMP_SPEED;
      }
      if (!keyPressed("space")) this.stillJumping = false;
      if (!this.isGrounded) this.jumpFrames++;

      if (this.isBreakingFall()) {
        if (this.canDoubleJump() && this.hasInInventory(BOOTS)) {
          this.dy = -DOUBLE_JUMP_SPEED;
          this.hasDoubleJump = false;
        } else if (this.hasInInventory(CLOAK)) {
          this.dy = GLIDE_SPEED;
        }
      }

      this.isGrounded = false;
    },
    handleMovement: function () {
      if (keyPressed("q")) {
        this.ddx = this.isSliding
          ? -SLIDING_MOVEMENT_ACCELERATION
          : -MOVEMENT_ACCELERATION;
      } else if (keyPressed("d")) {
        this.ddx = this.isSliding
          ? SLIDING_MOVEMENT_ACCELERATION
          : MOVEMENT_ACCELERATION;
      } else if (this.isSliding) {
        if (Math.abs(this.dx) <= MOVEMENT_FRICTION) {
          this.ddx = 0;
        } else {
          this.ddx = SLIDING_MOVEMENT_FRICTION * -Math.sign(this.dx);
        }
      } else if (this.isGrounded) {
        if (Math.abs(this.dx) <= MOVEMENT_FRICTION) {
          this.dx = 0;
          this.ddx = 0;
        } else {
          this.ddx = MOVEMENT_FRICTION * -Math.sign(this.dx);
        }
      } else {
        if (Math.abs(this.dx) <= AIR_MOVEMENT_FRICTION) {
          this.dx = 0;
          this.ddx = 0;
        } else {
          this.ddx = AIR_MOVEMENT_FRICTION * -Math.sign(this.dx);
        }
      }

      this.isSliding = false;
      this.dx = clamp(-MAX_MOVEMENT_SPEED, MAX_MOVEMENT_SPEED, this.dx);
      this.dy = clamp(-MAX_JUMP_SPEED, MAX_FALL_SPEED, this.dy);
    },
    update: function (dt) {
      this.updateAnimation(dt);
      this.advance();

      this.ddy = GRAVITY;

      if (!keyPressed("d") && !keyPressed("q") && this.dy === GRAVITY) {
        this.playCanvasAnimation("idle");
      } else if (this.dy === GRAVITY) {
        this.playCanvasAnimation("run");
      } else if (this.dy < GRAVITY) {
        this.playCanvasAnimation("jump");
      } else if (this.dy > GRAVITY) {
        this.playCanvasAnimation("fall");
      }

      if (textManager.isTextDisplayed()) {
        this.dx = 0;
        this.ddx = 0;
        return;
      }

      this.handleMovement();
      this.handleJump();

      if (this.dx > 0) {
        this.scaleX = 1;
      } else if (this.dx < 0) {
        this.scaleX = -1;
      }

      const animationSprite = this.children[0];
    },
    touchesGround: function () {
      this.isGrounded = true;
      this.hasDoubleJump = true;
      this.jumpFrames = 0;
      this.isJumping = false;
    },
    bounce: function () {
      this.dy = -1.2 * this.dy - 8;
    },
    slide: function () {
      this.isSliding = true;
    },
  });

  return hero
}

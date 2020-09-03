import { Sprite, SpriteSheet, keyPressed, clamp } from "kontra";

import { HeroRunAnimation } from "./HeroRunAnimation";
import { HeroIdleAnimation } from "./HeroIdleAnimation";
import { HeroJumpAnimation } from "./HeroJumpAnimation";
import { HeroFallAnimation } from "./HeroFallAnimation";
import drawHero from "./HeroAnimation";

const MAX_SPEED = 10;
const JUMP_SPEED = 8;
const DOUBLE_JUMP_SPEED = 10;
const MIN_JUMP_FRAMES = 4;
const MAX_JUMP_FRAMES = 15;
const GRAVITY = 0.6;
const GLIDE_SPEED = 0.2;
const MOVEMENT_SPEED = 3;

export function makeHero() {
  return new Promise(function (resolve, reject) {
    const hitBoxWidth = 10;
    const characterWidth = 32;
    const characterHeight = 38;
    const originX = -characterWidth / 2 + hitBoxWidth / 2;
    const headX = originX + characterWidth / 2;
    const headRadius = characterHeight / 3.5;
    const legSize = (characterHeight - headRadius * 2) / 2;
    const footSize = legSize / 2;

    resolve(
      Sprite({
        anchor: { x: 0.5, y: 0.5 },
        x: 100,
        y: 10,
        width: hitBoxWidth,
        height: 112 / 3,
        dx: 0,
        // Animations
        _a: 0,
        _f: 0,
        _currentAnimation: "run",
        _availableAnimations: {
          run: HeroRunAnimation,
          jump: HeroJumpAnimation,
          idle: HeroIdleAnimation,
          fall: HeroFallAnimation,
        },
        playCanvasAnimation: function (name) {
          if (name !== this._currentAnimation) {
            this._f = 0;
            this._a = 0;
            this._currentAnimation = name;
          }
        },
        drawingConstants: {
          width: characterWidth,
          height: characterHeight,
          originX,
          headX,
          headRadius,
          legSize,
          footSize,
        },
        // children: [animationSprite],
        jumpFrames: 0,
        isGrounded: false,
        isJumping: false,
        stillJumping: false,
        hasDoubleJump: false,
        render: function () {
          const frame = this._availableAnimations[
            this._currentAnimation
          ].frames[this._f].bind(this)();
          drawHero.bind(this)(frame);
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
            if (this.canDoubleJump()) {
              this.dy = -DOUBLE_JUMP_SPEED;
              this.hasDoubleJump = false;
            } else {
              this.dy = GLIDE_SPEED;
            }
          }

          this.isGrounded = false;
        },
        handleMovement: function () {
          this.dx = 0;
          if (keyPressed("q")) {
            this.dx = -MOVEMENT_SPEED;
          }
          if (keyPressed("d")) {
            this.dx = MOVEMENT_SPEED;
          }

          // Limit speed
          this.dx = clamp(-MAX_SPEED, MAX_SPEED, this.dx);
          this.dy = clamp(-MAX_SPEED, MAX_SPEED, this.dy);
        },
        update: function (dt) {
          this.updateAnimation(dt);
          this.advance();

          this.ddy = GRAVITY;

          this.handleJump();
          this.handleMovement();

          if (this.dx > 0) {
            this.scaleX = 1;
          } else if (this.dx < 0) {
            this.scaleX = -1;
          }

          const animationSprite = this.children[0];
          this.playCanvasAnimation("run");

          if (this.dx === 0 && this.dy === GRAVITY) {
            this.playCanvasAnimation("idle");
          } else if (this.dy === GRAVITY) {
            this.playCanvasAnimation("run");
          } else if (this.dy < GRAVITY) {
            this.playCanvasAnimation("jump");
          } else if (this.dy > GRAVITY) {
            this.playCanvasAnimation("fall");
          }
        },
        touchesGround: function () {
          this.isGrounded = true;
          this.hasDoubleJump = true;
          this.jumpFrames = 0;
          this.isJumping = false;
        },
      })
    );
  });
}

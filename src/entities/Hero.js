import { Sprite, SpriteSheet, keyPressed, clamp } from "kontra";
import spritesheet from "../assets/spritesheet-heros.png";

const MAX_SPEED = 10;
const JUMP_SPEED = 8;
const DOUBLE_JUMP_SPEED = 10;
const MIN_JUMP_FRAMES = 4;
const MAX_JUMP_FRAMES = 15;
const GRAVITY = 0.6
const GLIDE_SPEED = 0.2;
const MOVEMENT_SPEED = 3;

export function makeHero() {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = spritesheet;

    image.onload = function () {
      const spritesheet = SpriteSheet({
        image,
        frameWidth: 160 / 5,
        frameHeight: 112 / 3,
        animations: {
          run: {
            frames: [3, "5..7"],
            frameRate: 10,
          },
          idle: {
            frames: [8, "10..13"],
            frameRate: 10,
          },
          jump: {
            frames: [4, 9, 14],
            frameRate: 10,
          },
          fall: {
            frames: "0..2",
            frameRate: 10,
          },
        },
      });

      const animationSprite = Sprite({
        anchor: { x: 0.5, y: 0.5 },
        width: 160 / 5, // width and height of the sprite rectangle
        height: 112 / 3,
        animations: spritesheet.animations,
      })

      resolve(
        Sprite({
          anchor: { x: 0.5, y: 0.5 },
          x: 100, // starting x,y position of the sprite
          y: 10,
          width: 10, // width and height of the sprite rectangle
          height: 112 / 3,
          dx: 0, // move the sprite 2px to the right every frame
          children: [animationSprite],
          jumpFrames: 0,
          isGrounded: false,
          isJumping: false,
          stillJumping: false,
          hasDoubleJump: false,
          handleJump: function () {
            if (this.jumpFrames < MIN_JUMP_FRAMES && keyPressed("space")) {
              this.isJumping = true;
              this.stillJumping = true;
            }
            if (this.isJumping) {
              if (this.jumpFrames < MIN_JUMP_FRAMES ||
                 (this.jumpFrames < MAX_JUMP_FRAMES && this.stillJumping)) {
                this.dy = -JUMP_SPEED;
              }
            }
            if (!keyPressed("space"))
              this.stillJumping = false;
            if (!this.isGrounded)
              this.jumpFrames++;

            if (this.dy > GRAVITY && keyPressed("space")) {
              if (!this.stillJumping && this.hasDoubleJump) {
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
          update: function () {
            this.advance();

            this.ddy = GRAVITY;

            this.handleJump();
            this.handleMovement();

            if (this.dx > 0) {
              this.scaleX = 1
            } else if (this.dx < 0) {
              this.scaleX = -1
            }

            const animationSprite = this.children[0]
            if (this.dx === 0 && this.dy === GRAVITY) {
              animationSprite.playAnimation("idle");
            } else if (this.dy === GRAVITY) {
              animationSprite.playAnimation("run");
            } else if (this.dy < GRAVITY) {
              animationSprite.playAnimation("jump");
            } else if (this.dy > GRAVITY) {
              animationSprite.playAnimation("fall");
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
    };
  });
}

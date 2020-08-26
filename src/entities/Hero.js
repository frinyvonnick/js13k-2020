import { Sprite, SpriteSheet, keyPressed, clamp } from "kontra";
import spritesheet from "../assets/spritesheet-heros.png";

const MAX_SPEED = 10;
const MAX_MOVEMENT_SPEED = 4;
const MOVEMENT_ACCELERATION = 0.4;
const MOVEMENT_FRICTION = 0.5;

export function makeHero() {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = spritesheet;

    image.onload = function () {
      const spritesheet = SpriteSheet({
        image,
        frameWidth: 250 / 5,
        frameHeight: 175 / 3,
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
        width: 50, // width and height of the sprite rectangle
        height: 175 / 3,
        animations: spritesheet.animations,
      });

      resolve(
        Sprite({
          anchor: { x: 0.5, y: 0.5 },
          x: 100, // starting x,y position of the sprite
          y: 10,
          width: 20, // width and height of the sprite rectangle
          height: 175 / 3,
          isGrounded: false,
          dx: 0, // move the sprite 2px to the right every frame
          children: [animationSprite],
          handleJump: function () {
            if (this.isGrounded && keyPressed("space")) {
              this.dy = -MAX_SPEED;
            }
            this.isGrounded = false;
          },
          handleMovement: function () {
            if (keyPressed("q")) {
              this.ddx = -MOVEMENT_ACCELERATION;
            } else if (keyPressed("d")) {
              this.ddx = MOVEMENT_ACCELERATION;
            } else {
              if (Math.abs(this.dx) <= MOVEMENT_FRICTION) {
                this.dx = 0;
                this.ddx = 0;
              } else {
                this.ddx = MOVEMENT_FRICTION * -signOf(this.dx);
              }
            }

            // Limit speed
            this.dx = clamp(-MAX_MOVEMENT_SPEED, MAX_MOVEMENT_SPEED, this.dx);
            this.dy = clamp(-MAX_SPEED, MAX_SPEED, this.dy);
          },
          update: function () {
            this.advance();

            this.ddy = 0.4;

            this.handleJump();
            this.handleMovement();

            if (this.dx > 0) {
              this.scaleX = 1;
            } else if (this.dx < 0) {
              this.scaleX = -1;
            }

            const animationSprite = this.children[0];
            if (this.dx === 0 && this.dy === 0.4) {
              animationSprite.playAnimation("idle");
            } else if (this.dy === 0.4) {
              animationSprite.playAnimation("run");
            } else if (this.dy < 0.4) {
              animationSprite.playAnimation("jump");
            } else if (this.dy > 0.4) {
              animationSprite.playAnimation("fall");
            }
          },
        })
      );
    };
  });
}

function signOf(n) {
  if (n < 0) return -1;
  return 1;
}

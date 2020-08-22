import { Sprite, keyPressed, clamp } from "kontra";

const MAX_SPEED = 10;

export function makeHero() {
  return Sprite({
    x: 100, // starting x,y position of the sprite
    y: 10,
    color: "red", // fill color of the sprite rectangle
    width: 200, // width and height of the sprite rectangle
    height: 200,
    isGrounded: false,
    dx: 0, // move the sprite 2px to the right every frame
    handleJump: function () {
      if (this.isGrounded && keyPressed("space")) {
        this.dy = -MAX_SPEED;
      }
      this.isGrounded = false;
    },
    handleMovement: function () {
      this.dx = 0;
      if (keyPressed("q")) {
        this.dx = -2;
      }
      if (keyPressed("d")) {
        this.dx = 2;
      }

      // Limit speed
      this.dx = clamp(-MAX_SPEED, MAX_SPEED, this.dx);
      this.dy = clamp(-MAX_SPEED, MAX_SPEED, this.dy);
    },
    update: function () {
      this.ddy = 0.4;

      this.handleJump();
      this.handleMovement();

      this.advance();
    },
  });
}

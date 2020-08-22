import { Sprite } from "kontra";

export class Hero extends Sprite {
  constructor() {
    super({
      x: 100, // starting x,y position of the sprite
      y: 80,
      color: "red", // fill color of the sprite rectangle
      width: 200, // width and height of the sprite rectangle
      height: 200,
      dx: 2, // move the sprite 2px to the right every frame
    })
  }
}

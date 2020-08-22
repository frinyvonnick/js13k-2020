import { Sprite, keyPressed } from "kontra";

export class Hero extends Sprite {
  constructor() {
    super({
      x: 100, // starting x,y position of the sprite
      y: 80,
      color: "red", // fill color of the sprite rectangle
      width: 200, // width and height of the sprite rectangle
      height: 200,
      dx: 0, // move the sprite 2px to the right every frame
    })
  }

  update() {
    console.log('UPDATE')
    console.log(keyPressed('q'), keyPressed('d'))
    this.dx = 0
    if (keyPressed('q')) {
      this.dx = -2
    }
    if (keyPressed('d')) {
      this.dx = 2
    }
    super.update();
  }
}

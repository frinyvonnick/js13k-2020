import { Sprite } from "kontra";

export function makePlatform() {
  return Sprite({
    x: 100, // starting x,y position of the sprite
    y: 300,
    color: "orange", // fill color of the sprite rectangle
    width: 200, // width and height of the sprite rectangle
    height: 50,
  });
}


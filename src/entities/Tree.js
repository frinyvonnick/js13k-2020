import { Sprite } from "kontra";

export const defaultValues = {
  foliageRadius: 25,
  foliageColor: "green",
  trunkWidth: 5,
  trunkHeight: 100,
  trunkColor: "brown",
  x: 0,
  y: 0,
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Tree",
    width: props.foliageRadius * 2,
    height: props.foliageRadius + props.trunkHeight,
    render,
  });
};

export function render() {
  this.context.beginPath();

  const foliagePath = new Path2D();
  foliagePath.arc(this.foliageRadius, this.foliageRadius, this.foliageRadius, 0, 2  * Math.PI);
  this.context.fillStyle = this.foliageColor;
  this.context.fill(foliagePath)

  this.context.fillStyle = this.trunkColor;
  this.context.fillRect(this.foliageRadius - this.trunkWidth / 2, this.foliageRadius, this.trunkWidth, this.trunkHeight);
}

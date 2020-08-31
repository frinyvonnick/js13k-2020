import { Sprite } from "kontra";

export const defaultValues = {
  scaleX: 1,
  height: 50,
  foliageColor: "green",
  foliageShadowColor: "#2c582c",
  x: 0,
  y: 0,
};

export const makeEntity = function (props = defaultValues) {

  return Sprite({
    ...props,
    type: "Bush",
    render,
  });
};

export function render() {
  const shadowFoliageRadius = Math.round(this.height / 2)
  const foliageRadius = this.height
  this.width = foliageRadius * 2 + shadowFoliageRadius,

  this.context.beginPath();

  this.context.fillStyle = this.foliageShadowColor;
  const shadowFoliagePath = new Path2D();
  shadowFoliagePath.arc(shadowFoliageRadius, foliageRadius, shadowFoliageRadius, 0, Math.PI, true);
  this.context.fill(shadowFoliagePath);

  this.context.fillStyle = this.foliageColor;
  const foliagePath = new Path2D();
  foliagePath.arc(foliageRadius + shadowFoliageRadius, foliageRadius, foliageRadius, 0, Math.PI, true);
  this.context.fill(foliagePath);
}

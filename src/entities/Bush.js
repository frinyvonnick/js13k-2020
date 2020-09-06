import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  scaleX: 1,
  height: 50,
  foliageColor: "#8ec36f",
  foliageShadowColor: "#72b44b",
};

export const makeEntity = function (props = defaultValues) {
  let foliageShadowColor = props.foliageShadowColor;
  let foliageColor = props.foliageColor;
  if (props.group === 1) {
    foliageShadowColor = changeColorLuminance(foliageShadowColor, -0.5);
    foliageColor = changeColorLuminance(foliageColor, -0.5);
  }
  if (props.group === 3) {
    foliageShadowColor = changeColorLuminance(foliageShadowColor, 0.1);
    foliageColor = changeColorLuminance(foliageColor, 0.1);
  }
  return Sprite({
    ...props,
    type: "Bush",
    foliageColor,
    foliageShadowColor,
    render,
  });
};

export function render() {
  const shadowFoliageRadius = Math.round(this.height / 2);
  const foliageRadius = this.height;
  this.width = foliageRadius * 2 + shadowFoliageRadius
    this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;

  this.context.fillStyle = this.foliageShadowColor;
  const shadowFoliagePath = new Path2D();
  shadowFoliagePath.arc(
    shadowFoliageRadius,
    foliageRadius,
    shadowFoliageRadius,
    0,
    Math.PI,
    true
  );
  this.context.fill(shadowFoliagePath);

  this.context.fillStyle = this.foliageColor;
  const foliagePath = new Path2D();
  foliagePath.arc(
    foliageRadius + shadowFoliageRadius,
    foliageRadius,
    foliageRadius,
    0,
    Math.PI,
    true
  );
  this.context.fill(foliagePath);
}

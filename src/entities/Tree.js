import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  foliageRadius: 25,
  foliageColor: "#AAD293",
  trunkWidth: 5,
  trunkHeight: 100,
  trunkColor: "#3E4937",
};

export const makeEntity = function (props = defaultValues) {
  let trunkColor = props.trunkColor;
  let foliageColor = props.foliageColor;
  if (props.group === 1) {
    trunkColor = changeColorLuminance(trunkColor, -0.5);
    foliageColor = changeColorLuminance(foliageColor, -0.5);
  }
  if (props.group === 3) {
    trunkColor = changeColorLuminance(trunkColor, 0.1);
    foliageColor = changeColorLuminance(foliageColor, 0.1);
  }

  return Sprite({
    ...props,
    type: "Tree",
    width: props.foliageRadius * 2,
    height: props.foliageRadius + props.trunkHeight,
    trunkColor,
    foliageColor,
    render,
  });
};

export function render() {

  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;

  const foliagePath = new Path2D();
  foliagePath.arc(
    this.foliageRadius,
    this.foliageRadius,
    this.foliageRadius,
    0,
    2 * Math.PI
  );
  this.context.fillStyle = this.foliageColor;
  this.context.fill(foliagePath);

  this.context.fillStyle = this.trunkColor;
  this.context.fillRect(
    this.foliageRadius - this.trunkWidth / 2,
    this.foliageRadius,
    this.trunkWidth,
    this.trunkHeight
  );
}

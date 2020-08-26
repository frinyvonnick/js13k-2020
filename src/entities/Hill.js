import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  hillWidth: 100,
  hillHeight: 50,
  color: "#AAD293",
};

export const makeEntity = function (props = defaultValues) {
  let color = props.color;
  if (props.group === 1) {
    color = changeColorLuminance(color, -0.5);
  }
  if (props.group === 3) {
    color = changeColorLuminance(color, 0.1);
  }
  const width = props.hillWidth * 0.5;
  const height = props.hillHeight * 0.5;

  return Sprite({
    ...props,
    type: "Hill",
    color,
    width,
    height,
    render,
  });
};

export function render() {
  this.context.fillStyle = this.color;
  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;
  this.context.moveTo(-this.width / 2, this.hillHeight - this.height);
  this.context.quadraticCurveTo(
    this.hillWidth / 2 - this.width / 2,
    -this.height,
    this.hillWidth - this.width / 2,
    this.hillHeight - this.height
  );
  this.context.fill();
}

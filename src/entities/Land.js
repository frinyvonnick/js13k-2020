import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
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

  return Sprite({
    ...props,
    type: "Land",
    color,
    render,
  });
};

export function render() {
  this.context.beginPath();
  this.context.fillStyle = this.color;
  this.context.rect(0, 0, this.width, this.height);
  this.context.fill();
}

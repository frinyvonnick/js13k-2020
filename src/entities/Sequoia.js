import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 100,
  height: 1000,
  color: "#73955F",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Sequoia",
    render,
  });
};

export function render() {
  let color = this.color;
  if (this.group === 1) {
    color = changeColorLuminance(this.color, -0.5);
  }
  if (this.group === 3) {
    color = changeColorLuminance(this.color, 0.3);
  }

  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;
  this.context.fillStyle = color;
  this.context.rect(0, 0, this.width, this.height);
  this.context.fill();
}

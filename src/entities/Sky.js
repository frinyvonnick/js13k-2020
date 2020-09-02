import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  color: "#e3f0db",
  lightColor: "#f9fcf8",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Sky",
    render,
  });
};

export function render() {
  this.context.beginPath();
  const gradient = this.context.createLinearGradient(0, this.height, 0, 0);
  gradient.addColorStop(0, this.lightColor);
  gradient.addColorStop(1, this.color);
  this.context.fillStyle = gradient;
  this.context.fillRect(0, 0, this.width, this.height);
}

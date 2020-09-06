import { Sprite } from "kontra";
import { commonValues } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 30,
  height: 30,
  content: "",
  opened: false,
  color: "brown",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Chest",
    render,
  });
};

export function render() {
  const boxHeight = (this.height / 3) * 2;
  const lidHeight = this.height / 3;

  this.context.beginPath();
  this.context.fillStyle = this.color;

  this.context.rect(0, lidHeight, this.width, boxHeight);
  this.context.fill();

  this.context.beginPath();

  this.context.save();

  const lidPath = new Path2D();
  if (this.opened) {
    this.context.translate(this.width, 0);
    this.context.rotate((Math.PI / 180) * 270);
    lidPath.arc(lidHeight / 2, 0, this.width / 2, 0, Math.PI, false);
  } else {
    this.context.translate(this.width / 2, 0);
    this.context.rotate((Math.PI / 180) * 180);
    lidPath.arc(0, -lidHeight - 1, this.width / 2, 0, Math.PI, false);
  }

  this.context.fill(lidPath);
  this.context.restore();
}

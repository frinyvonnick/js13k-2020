import { Sprite } from "kontra";
import { commonValues } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 20,
  height: 20,
  color: "gray",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Key",
    keyRadius: props.width / 4,
    render,
  });
};

export function render() {
  this.context.beginPath();
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 3;

  this.context.arc(
    this.width - this.keyRadius,
    this.keyRadius,
    this.keyRadius,
    0,
    Math.PI * 2,
    false
  );

  this.context.moveTo(
    this.width - this.keyRadius * 2 + 2,
    this.keyRadius * 2 - 2
  );
  this.context.lineTo(0, this.height);
  this.context.moveTo(4, this.height - 4);
  this.context.lineTo(8, this.height);

  this.context.stroke();
}

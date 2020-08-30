import { Sprite } from "kontra";

export const defaultValues = {
  radius: 25,
  color: "red",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    width: props.radius * 2,
    height: props.radius * 2,
    type: "Circle",
    render,
  });
};

export function render() {
  this.context.fillStyle = this.color;

  this.context.beginPath();
  this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
  this.context.fill();
}

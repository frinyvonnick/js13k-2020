import { Sprite } from "kontra";
import { commonValues } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  color: "blue",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Bounce",
    render: function () {
      this.context.beginPath();
      this.context.fillStyle = this.color;
      this.context.rect(0, -2, this.width, this.height);
      this.context.fill();
    },
  });
};

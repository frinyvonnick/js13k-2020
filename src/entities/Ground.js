import { Sprite } from "kontra";

export const defaultValues = {
  width: 50,
  height: 50,
  color: "red",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Ground",
  });
};

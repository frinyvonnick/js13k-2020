import { Sprite } from "kontra";
import { commonValues } from "./common";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  content: '',
  color: "brown",
};

export const makeEntity = function (props = defaultValues) {
  return Sprite({
    ...props,
    type: "Chest",
  });
};


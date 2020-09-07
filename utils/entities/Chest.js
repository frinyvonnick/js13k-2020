import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Chest";

export const defaultValues = {
  ...commonValues,
  width: 30,
  height: 30,
  content: "",
  opened: false,
  color: "brown",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Chest",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

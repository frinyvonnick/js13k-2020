import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Ground";

export const defaultValues = {
  ...commonValues,
  width: 100,
  height: 100,
  color: "purple",
  inventory: "",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Spawn",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

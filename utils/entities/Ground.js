import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Ground";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  color: "red",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Ground",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Ground";

export const defaultValues = {
  ...commonValues,
  width: 100,
  height: 10,
  color: "#61452d",
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

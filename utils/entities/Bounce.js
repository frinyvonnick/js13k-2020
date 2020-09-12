import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Bounce";

export const defaultValues = {
  ...commonValues,
  width: 100,
  height: 10,
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Bounce",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

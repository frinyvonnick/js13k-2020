import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Ground";

export const defaultValues = {
  ...commonValues,
  width: 200,
  height: 200,
  color: "pink",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "End",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

import { Sprite } from "kontra";
import { commonValues } from "./common";

import { render as r } from "../../src/entities/Key";

export const defaultValues = {
  ...commonValues,
  width: 20,
  height: 20,
  color: "gray",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Key",
    keyRadius: props.width / 4,
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

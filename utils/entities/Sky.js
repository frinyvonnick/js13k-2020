import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Sky";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  color: "#e3f0db",
  lightColor: "#f9fcf8",
};

export function computeProps(props) {
  return {
    ...defaultValues,
    ...props,
    type: "Sky",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

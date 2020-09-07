import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Land";

export const defaultValues = {
  ...commonValues,
  width: 50,
  height: 50,
  color: "#AAD293",
};

export function computeProps(props) {
  let computedColor = props.color;
  if (props.group === 1) {
    computedColor = changeColorLuminance(computedColor, -0.5);
  }
  if (props.group === 3) {
    computedColor = changeColorLuminance(computedColor, 0.1);
  }

  return {
    ...defaultValues,
    ...props,
    type: "Land",
    computedColor,
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

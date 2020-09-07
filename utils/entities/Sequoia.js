import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Sequoia";

export const defaultValues = {
  ...commonValues,
  width: 100,
  height: 1000,
  color: "#73955F",
};

export function computeProps(props) {
  const { color, ...otherProps } = props;
  let computedColor = color;
  if (props.group === 1) {
    computedColor = changeColorLuminance(computedColor, -0.5);
  }
  if (props.group === 3) {
    computedColor = changeColorLuminance(computedColor, 0.3);
  }

  return {
    ...defaultValues,
    ...otherProps,
    computedColor,
    type: "Sequoia",
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

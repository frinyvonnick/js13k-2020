import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Hill";

export const defaultValues = {
  ...commonValues,
  hillWidth: 100,
  hillHeight: 50,
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
  const width = props.hillWidth * 0.5;
  const height = props.hillHeight * 0.5;

  return {
    ...defaultValues,
    ...props,
    type: "Hill",
    computedColor,
    width,
    height,
  };
}
export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

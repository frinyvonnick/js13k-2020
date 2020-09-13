import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Tent";

export const defaultValues = {
  ...commonValues,
  width: 200,
  height: 100,
  color: "#97ba82",
  patternColor: "#496b33",
};

export function computeProps(props) {
  let computedColor = props.color;
  if (props.group === 1) {
    computedColor = changeColorLuminance(computedColor, -0.5);
  }
  if (props.group === 3) {
    computedColor = changeColorLuminance(computedColor, 0.2);
  }
  let patternComputedColor = props.patternColor;
  if (props.group === 1) {
    patternComputedColor = changeColorLuminance(patternComputedColor, -0.5);
  }
  if (props.group === 3) {
    patternComputedColor = changeColorLuminance(patternComputedColor, 0.2);
  }

  return {
    ...defaultValues,
    ...props,
    type: "Tent",
    computedColor,
    patternComputedColor,
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

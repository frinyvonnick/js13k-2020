import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Bush";

export const defaultValues = {
  ...commonValues,
  scaleX: 1,
  height: 50,
  foliageColor: "#8ec36f",
  foliageShadowColor: "#72b44b",
};

export function computeProps(props) {
  let foliageShadowComputedColor = props.foliageShadowColor;
  let foliageComputedColor = props.foliageColor;
  if (props.group === 1) {
    foliageShadowComputedColor = changeColorLuminance(
      foliageShadowComputedColor,
      -0.5
    );
    foliageComputedColor = changeColorLuminance(foliageComputedColor, -0.5);
  }
  if (props.group === 3) {
    foliageShadowComputedColor = changeColorLuminance(
      foliageShadowComputedColor,
      0.1
    );
    foliageComputedColor = changeColorLuminance(foliageComputedColor, 0.1);
  }

  return {
    ...defaultValues,
    ...props,
    type: "Bush",
    foliageComputedColor,
    foliageShadowComputedColor,
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};
export const render = r;

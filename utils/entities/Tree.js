import { Sprite } from "kontra";
import { commonValues, changeColorLuminance } from "./common";

import { render as r } from "../../src/entities/Tree";

export const defaultValues = {
  ...commonValues,
  foliageRadius: 25,
  foliageColor: "#AAD293",
  trunkWidth: 5,
  trunkHeight: 100,
  trunkColor: "#3E4937",
};

export function computeProps(props) {
  let trunkComputedColor = props.trunkColor;
  let foliageComputedColor = props.foliageColor;
  if (props.group === 1) {
    trunkComputedColor = changeColorLuminance(trunkComputedColor, -0.5);
    foliageComputedColor = changeColorLuminance(foliageComputedColor, -0.5);
  }
  if (props.group === 3) {
    trunkComputedColor = changeColorLuminance(trunkComputedColor, 0.1);
    foliageComputedColor = changeColorLuminance(foliageComputedColor, 0.1);
  }

  return {
    ...defaultValues,
    ...props,
    type: "Tree",
    width: props.foliageRadius * 2,
    height: props.foliageRadius + props.trunkHeight,
    trunkComputedColor,
    foliageComputedColor,
    render: r,
  };
}

export const makeEntity = function (props) {
  return Sprite({
    ...computeProps(props),
    render: r,
  });
};

export const render = r;

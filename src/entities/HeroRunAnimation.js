import drawHero from "./HeroAnimation";
import { drawingConstants } from "./HeroDrawingConstants";

const {
  width,
  height,
  originX,
  headX,
  headRadius,
  legSize,
  footSize,
} = drawingConstants;

let headY = headRadius - footSize;
let leftLeg = [headX - 3, headRadius * 2 - 2 - footSize];
let leftKnee = [leftLeg[0] - Math.abs(originX) / 2, leftLeg[1] + legSize];
let leftFoot = [originX, leftKnee[1] + legSize];
let leftFootTip = [leftFoot[0] + footSize, leftFoot[1] + footSize];

let rightLeg = [headX + 3, headRadius * 2 - 2 - footSize];
let rightKnee = [rightLeg[0] + legSize, rightLeg[1] + legSize];
let rightFoot = [rightKnee[0] - legSize, rightKnee[1] + legSize / 2];
let rightFootTip = [rightFoot[0] + footSize, rightFoot[1] + footSize];

const frame1 = {
  headRadius,
  headX,
  headY,
  leftLeg,
  leftKnee,
  leftFoot,
  leftFootTip,
  rightLeg,
  rightKnee,
  rightFoot,
  rightFootTip,
  featherRotation: 270,
  featherMovement: 2,
};

headY = headRadius;
leftLeg = [headX - 3, headRadius * 2 - 2];
leftKnee = [leftLeg[0] - 3, leftLeg[1] + legSize];
leftFoot = [leftKnee[0] - legSize, leftKnee[1] - legSize / 2];
leftFootTip = [leftFoot[0] - footSize / 2, leftFoot[1] + footSize];

rightLeg = [headX + 3, headRadius * 2 - 2];
rightKnee = [rightLeg[0] + 3, rightLeg[1] + legSize];
rightFoot = [rightKnee[0] + 3, rightKnee[1] + legSize];
rightFootTip = [rightFoot[0] + footSize, rightFoot[1] - footSize / 2];
const frame2 = {
  headRadius,
  headX,
  headY,
  leftLeg,
  leftKnee,
  leftFoot,
  leftFootTip,
  rightLeg,
  rightKnee,
  rightFoot,
  rightFootTip,
  featherRotation: 270,
  featherMovement: 2,
};

headY = headRadius + footSize;
leftLeg = [headX - 3, headRadius * 2 - 2 + footSize / 2];
leftKnee = [leftLeg[0], leftLeg[1] + legSize];
leftFoot = [leftKnee[0] - legSize, leftKnee[1]];
leftFootTip = [leftFoot[0], leftFoot[1] + footSize];

rightLeg = [headX + 3, headRadius * 2 - 2 + footSize / 2];
rightKnee = [rightLeg[0] + 3, rightLeg[1] + legSize];
rightFoot = [rightKnee[0] - 3, rightKnee[1] + legSize];
rightFootTip = [rightFoot[0] + footSize, rightFoot[1]];
const frame3 = {
  headRadius,
  headX,
  headY,
  leftLeg,
  leftKnee,
  leftFoot,
  leftFootTip,
  rightLeg,
  rightKnee,
  rightFoot,
  rightFootTip,
  featherRotation: 270,
  featherMovement: 2,
};

headY = headRadius + footSize;
leftLeg = [headX - 3, headRadius * 2 - 2 + footSize / 2];
leftKnee = [leftLeg[0] + 3, leftLeg[1] + legSize];
leftFoot = [leftKnee[0] - legSize, leftKnee[1] + 1];
leftFootTip = [leftFoot[0], leftFoot[1] + footSize];

rightLeg = [headX + 3, headRadius * 2 - 2 + footSize / 2];
rightKnee = [rightLeg[0] - 3, rightLeg[1] + legSize];
rightFoot = [rightKnee[0] - 3, rightKnee[1] + legSize];
rightFootTip = [rightFoot[0] + footSize, rightFoot[1]];
const frame4 = {
  headRadius,
  headX,
  headY,
  leftLeg,
  leftKnee,
  leftFoot,
  leftFootTip,
  rightLeg,
  rightKnee,
  rightFoot,
  rightFootTip,
  featherRotation: 270,
};

export const HeroRunAnimation = {
  frameRate: 10,
  frames: [frame1, frame2, frame3, frame4],
};

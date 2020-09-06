const { drawingConstants } = require("./HeroDrawingConstants");

const {
  width,
  height,
  originX,
  headX,
  headRadius,
  legSize,
  footSize,
} = drawingConstants;

const headY = headRadius;
const leftLeg = [headX - 3, headRadius * 2 - 2];
const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
const rightLeg = [headX + 3, headRadius * 2 - 2];
const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
let rightFootTip = [rightFoot[0] + footSize, rightFoot[1]];

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
  cloakRotation: 280,
  cloakMovement: 0,
};

rightFootTip = [rightFoot[0] + footSize, rightFoot[1] - 1];
const frame2 = {
  ...frame1,
  rightFootTip,
};

module.exports = {
  frameRate: 10,
  frames: [frame1, frame2, frame1, frame1, frame1],
};

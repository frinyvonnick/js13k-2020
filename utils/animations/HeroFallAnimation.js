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
const leftKnee = [leftLeg[0] + legSize, leftLeg[1] - 3];
const leftFoot = [leftKnee[0] - legSize, leftLeg[1] + legSize];
const leftFootTip = [leftFoot[0] + footSize, leftFoot[1] + 3];

const rightLeg = [headX + 3, headRadius * 2 - 2];
const rightKnee = [rightLeg[0] + legSize, rightLeg[1] - 3];
const rightFoot = [rightKnee[0] - legSize, rightLeg[1] + legSize];
const rightFootTip = [rightFoot[0] + footSize, rightFoot[1] + 3];

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
  cloakRotation: 90,
  featherMovement: 2,
};

module.exports = {
  frameRate: 10,
  frames: [frame1, frame1, frame1],
};

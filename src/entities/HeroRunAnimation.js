import drawHero from "./HeroAnimation";

const frame1 = function () {
  const {
    width,
    height,
    originX,
    headX,
    headRadius,
    legSize,
    footSize,
  } = this.drawingConstants;

  const headY = headRadius - footSize;
  const leftLeg = [headX - 3, headRadius * 2 - 2 - footSize];
  const leftKnee = [leftLeg[0] - Math.abs(originX) / 2, leftLeg[1] + legSize];
  const leftFoot = [originX, leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2 - footSize];
  const rightKnee = [rightLeg[0] + legSize, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - legSize, rightKnee[1] + legSize / 2];
  const rightFootTip = [rightFoot[0] + footSize, rightFoot[1] + footSize];

  return {
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
  };
};

const frame2 = function () {
  const {
    width,
    height,
    originX,
    headX,
    headRadius,
    legSize,
    footSize,
  } = this.drawingConstants;

  const headY = headRadius;
  const leftLeg = [headX - 3, headRadius * 2 - 2];
  const leftKnee = [leftLeg[0] - 3, leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0] - legSize, leftKnee[1] - legSize / 2];
  const leftFootTip = [leftFoot[0] - footSize / 2, leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0] + 3, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] + 3, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + footSize, rightFoot[1] - footSize / 2];

  return {
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
  };
};

const frame3 = function () {
  const {
    width,
    height,
    originX,
    headX,
    headRadius,
    legSize,
    footSize,
  } = this.drawingConstants;

  const headY = headRadius + footSize;
  const leftLeg = [headX - 3, headRadius * 2 - 2 + footSize / 2];
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0] - legSize, leftKnee[1]];
  const leftFootTip = [leftFoot[0], leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2 + footSize / 2];
  const rightKnee = [rightLeg[0] + 3, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - 3, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + footSize, rightFoot[1]];

  return {
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
  };
};

const frame4 = function () {
  const {
    width,
    height,
    originX,
    headX,
    headRadius,
    legSize,
    footSize,
  } = this.drawingConstants;

  const headY = headRadius + footSize;
  const leftLeg = [headX - 3, headRadius * 2 - 2 + footSize / 2];
  const leftKnee = [leftLeg[0] + 3, leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0] - legSize, leftKnee[1] + 1];
  const leftFootTip = [leftFoot[0], leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2 + footSize / 2];
  const rightKnee = [rightLeg[0] - 3, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - 3, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + footSize, rightFoot[1]];

  return {
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
  };
};

export const HeroRunAnimation = {
  frameRate: 10,
  frames: [frame1, frame2, frame3, frame4],
};

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
  const headY = headRadius;
  const leftLeg = [headX - 3, headRadius * 2 - 2];
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
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
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + footSize, rightFoot[1] - 1];
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

  const headY = headRadius;
  const leftLeg = [headX - 3, headRadius * 2 - 2];
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
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

  const headY = headRadius;
  const leftLeg = [headX - 3, headRadius * 2 - 2];
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
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

const frame5 = function () {
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
  const leftKnee = [leftLeg[0], leftLeg[1] + legSize];
  const leftFoot = [leftKnee[0], leftKnee[1] + legSize];
  const leftFootTip = [leftFoot[0] + footSize, leftFoot[1]];
  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0], rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0], rightKnee[1] + legSize];
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
export const HeroIdleAnimation = {
  frameRate: 10,
  frames: [frame1, frame2, frame3, frame4, frame5],
};

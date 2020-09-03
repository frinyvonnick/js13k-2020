const frame1 = function() {
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
  const leftLeg = [headX - 3, headRadius * 2 - 4 - footSize];
  const leftKnee = [leftLeg[0] - Math.abs(originX) / 2, leftLeg[1] + legSize];
  const leftFoot = [originX, leftKnee[1] + legSize + 3];
  const leftFootTip = [leftFoot[0] + 1, leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0] - Math.abs(originX) / 2, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - Math.abs(originX) / 2, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + 1, rightFoot[1] + footSize];

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
    cloakRotation: 330,
    featherRotation: 240,
    featherMovement: 2,
  };
};

const frame2 = function() {
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
  const leftLeg = [headX - 3, headRadius * 2 - 4 - footSize];
  const leftKnee = [leftLeg[0] - Math.abs(originX) / 2, leftLeg[1] + legSize];
  const leftFoot = [originX, leftKnee[1] + legSize + 3];
  const leftFootTip = [leftFoot[0] + 1, leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0] - Math.abs(originX) / 2, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - Math.abs(originX) / 2, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + 1, rightFoot[1] + footSize];

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
    cloakRotation: 330,
    featherRotation: 240,
    featherMovement: 2,
  };
};

const frame3 = function() {
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
  const leftLeg = [headX - 3, headRadius * 2 - 4 - footSize];
  const leftKnee = [leftLeg[0] - Math.abs(originX) / 2, leftLeg[1] + legSize];
  const leftFoot = [originX, leftKnee[1] + legSize + 3];
  const leftFootTip = [leftFoot[0] + 1, leftFoot[1] + footSize];

  const rightLeg = [headX + 3, headRadius * 2 - 2];
  const rightKnee = [rightLeg[0] - Math.abs(originX) / 2, rightLeg[1] + legSize];
  const rightFoot = [rightKnee[0] - Math.abs(originX) / 2, rightKnee[1] + legSize];
  const rightFootTip = [rightFoot[0] + 1, rightFoot[1] + footSize];

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
    cloakRotation: 330,
    featherRotation: 240,
    featherMovement: 2,
  };
};

export const HeroJumpAnimation = {
  frameRate: 10,
  frames: [frame1, frame2, frame3],
};

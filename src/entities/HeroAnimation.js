export default function drawHero(
  {
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
    cloakRotation,
    cloakMovement,
    featherRotation,
    featherMovement,
  },
  frameIndex
) {
  this.context.beginPath();
  this.context.fillStyle = "black";

  this.context.arc(headX, headY, headRadius, 2 * Math.PI, false);

  this.context.fill();

  drawBandana.bind(this)({ headRadius, headX, headY });

  drawFeather.bind(this)({
    headRadius,
    headX,
    headY,
    featherRotation,
    featherMovement,
    frameIndex,
  });
  drawCloak.bind(this)({
    headRadius,
    headX,
    headY,
    frameIndex,
    cloakRotation,
    cloakMovement,
  });

  // Draw body
  this.context.beginPath();
  this.context.strokeStyle = "black";
  this.context.lineWidth = 3;

  // Draw legs
  this.context.moveTo(...leftLeg);
  this.context.lineTo(...leftKnee);
  this.context.lineTo(...leftFoot);
  this.context.lineTo(...leftFootTip);

  this.context.moveTo(...rightLeg);
  this.context.lineTo(...rightKnee);
  this.context.lineTo(...rightFoot);
  this.context.lineTo(...rightFootTip);

  this.context.lineJoin = "round";
  this.context.stroke();

  drawBoot.bind(this)({ foot: leftFoot, footTip: leftFootTip });
  drawBoot.bind(this)({ foot: rightFoot, footTip: rightFootTip });
}

function drawCloak({
  headRadius,
  headX,
  headY,
  cloakRotation = 0,
  cloakSize = 20,
  cloakMovement = 2,
  frameIndex,
}) {
  this.context.beginPath();
  this.context.fillStyle = "yellow";
  this.context.lineJoin = "round";

  this.context.moveTo(headX - headRadius - 1, headY + 2);
  this.context.lineTo(headX + headRadius + 1, headY + 2);
  this.context.lineTo(headX - headRadius - 1, headY + 4);
  this.context.lineTo(headX - headRadius - 1, headY + 2);

  this.context.fill();

  this.context.beginPath();
  this.context.save();
  this.context.translate(headX - headRadius - 1, headY + 3);
  if (cloakRotation !== 0) {
    this.context.rotate((Math.PI / 180) * cloakRotation);
  }
  this.context.moveTo(0, -1);

  const cloakTipTopY = 0;
  const cloakTipBottomY = 4;
  const cloakFrame = frameIndex % 3;

  if (cloakFrame === 0) {
    this.context.lineTo(-cloakSize, cloakTipTopY);
    this.context.lineTo(-cloakSize, cloakTipBottomY);
    this.context.lineTo(0, 1);
    this.context.lineTo(0, -1);
  } else if (cloakFrame === 1) {
    this.context.lineTo(-cloakSize, cloakTipTopY - cloakMovement);
    this.context.lineTo(-cloakSize, cloakTipBottomY - cloakMovement);
    this.context.lineTo(0, 1);
    this.context.lineTo(0, -1);
  } else if (cloakFrame === 2) {
    this.context.lineTo(-cloakSize, cloakTipTopY + cloakMovement);
    this.context.lineTo(-cloakSize, cloakTipBottomY + cloakMovement);
    this.context.lineTo(0, 1);
    this.context.lineTo(0, -1);
  }

  this.context.restore();

  this.context.fill();
}

function drawBandana({ headRadius, headX, headY }) {
  this.context.beginPath();
  this.context.fillStyle = "blue";
  this.context.lineJoin = "round";

  this.context.moveTo(headX - headRadius - 1, headY - 3);
  this.context.lineTo(headX + headRadius + 1, headY - 3);
  this.context.lineTo(headX + headRadius - 2, headY - 8);
  this.context.lineTo(headX - headRadius + 2, headY - 8);
  this.context.lineTo(headX - headRadius - 1, headY - 3);

  this.context.fill();
}

function drawFeather({
  headRadius,
  headX,
  headY,
  frameIndex,
  featherRotation = 0,
  featherMovement = 0,
}) {
  this.context.save();
  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.lineJoin = "miter";

  const featherX = headX - headRadius + 2;
  const featherY = headY - 6;

  this.context.translate(featherX, featherY);
  if (featherRotation !== 0) {
    this.context.rotate((Math.PI / 180) * featherRotation);
  }

  this.context.moveTo(0, 0);

  const featherFrame = frameIndex % 3;

  if (featherFrame === 0) {
    this.context.quadraticCurveTo(-4, -7, 0, -14);
    this.context.quadraticCurveTo(4, -7, 0, 0);
  } else if (featherFrame === 1) {
    this.context.quadraticCurveTo(-4 - featherMovement, -7, 0, -14);
    this.context.quadraticCurveTo(4 - featherMovement, -7, 0, 0);
  } else if (featherFrame === 2) {
    this.context.quadraticCurveTo(-4 + featherMovement, -7, 0, -14);
    this.context.quadraticCurveTo(4 + featherMovement, -7, 0, 0);
  }

  this.context.clip();
  this.context.fillRect(-4, -14, 8, 14);
  this.context.fillStyle = "black";
  this.context.fillRect(-4, -14, 8, 4);
  this.context.restore();
}

function drawBoot({ foot, footTip }) {
  this.context.save();

  this.context.beginPath();
  this.context.strokeStyle = "orange";
  this.context.lineWidth = 3;
  this.context.moveTo(foot[0] - 1.5, foot[1]);
  this.context.lineTo(footTip[0] + 0.5, footTip[1]);
  this.context.lineJoin = "round";
  this.context.stroke();

  this.context.restore();
}

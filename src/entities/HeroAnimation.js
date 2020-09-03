export default function drawHero({
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
}) {
  this.context.beginPath();
  this.context.fillStyle = "black";

  this.context.arc(headX, headY, headRadius, 2 * Math.PI, false);

  this.context.fill();

  // Draw bandana
  this.context.beginPath();
  this.context.fillStyle = "blue";
  this.context.lineJoin = "round";

  this.context.moveTo(headX - headRadius - 1, headY - 3);
  this.context.lineTo(headX + headRadius + 1, headY - 3);
  this.context.lineTo(headX + headRadius - 2, headY - 8);
  this.context.lineTo(headX - headRadius + 2, headY - 8);
  this.context.lineTo(headX - headRadius - 1, headY - 3);

  this.context.fill();

  /*
  // Draw feather
  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.lineJoin = "miter";

  const featherX = headX - headRadius + 2;
  const featherY = headY - 6;

  this.context.moveTo(featherX, featherY);
  this.context.quadraticCurveTo(
    featherX - 4,
    featherY - 7,
    featherX,
    featherY - 14
  );
  this.context.quadraticCurveTo(featherX + 4, featherY - 7, featherX, featherY);
  this.context.clip()
  this.context.fillRect(featherX - 4, featherY - 14, 8, 14)
  this.context.fillStyle = "black";
  this.context.fillRect(featherX - 4, featherY - 14, 8, 4)
  this.context.restore();
  */

  // Draw body
  this.context.beginPath();
  this.context.strokeStyle = "black";
  this.context.lineWidth = 3;

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
}

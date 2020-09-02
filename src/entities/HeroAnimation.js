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

  this.context.lineJoin = 'round';
  this.context.stroke();
}

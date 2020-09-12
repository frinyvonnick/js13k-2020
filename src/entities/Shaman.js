import animations from "./animations.json";
import drawHero from "./HeroAnimation";

function drawMask() {
  this.context.beginPath();
  this.context.fillStyle = "#582900";
  const headTop = 0;
  const headHeight = (this.height / 3) * 2;
  const widthRepere = this.width / 4;
  this.context.translate(-this.width / 3, 0);
  this.context.moveTo(0, headTop);
  this.context.lineTo(widthRepere, headTop + headHeight);
  this.context.lineTo(widthRepere + widthRepere * 2, headTop + headHeight);
  this.context.lineTo(this.width, headTop);
  this.context.lineTo(0, headTop);
  this.context.fill();

  this.context.beginPath();
  this.context.fillStyle = "#fffeb5";
  this.context.strokeStyle = "#a5764c";
  this.context.lineWidth = 1.5;
  this.context.moveTo(widthRepere - 10, headTop + 5);
  this.context.lineTo(widthRepere - 5, headTop + 10);
  this.context.lineTo(widthRepere, headTop + 10);
  this.context.lineTo(widthRepere + 5, headTop + 5);
  this.context.lineTo(widthRepere - 10, headTop + 5);
  this.context.fill();
  this.context.stroke();

  this.context.beginPath();
  this.context.fillStyle = "#fffeb5";
  this.context.strokeStyle = "#a5764c";
  this.context.lineWidth = 1.5;
  this.context.moveTo(widthRepere * 3 - 5, headTop + 5);
  this.context.lineTo(widthRepere * 3, headTop + 10);
  this.context.lineTo(widthRepere * 3 + 5, headTop + 10);
  this.context.lineTo(widthRepere * 3 + 10, headTop + 5);
  this.context.lineTo(widthRepere * 3 - 5, headTop + 5);
  this.context.fill();
  this.context.stroke();

  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.strokeStyle = "#a5764c";
  this.context.lineWidth = 1.5;
  this.context.arc(
    widthRepere * 2,
    headTop + (headHeight / 3) * 2,
    4,
    0,
    2 * Math.PI,
    false
  );
  this.context.fill();
  this.context.stroke();

  this.context.beginPath();
  this.context.fillStyle = "#ff6961";
  const firstFeather = 5;
  this.context.moveTo(firstFeather, headTop);
  this.context.quadraticCurveTo(
    firstFeather - 6,
    headTop - 7,
    firstFeather,
    headTop - 20
  );
  this.context.quadraticCurveTo(
    firstFeather + 6,
    headTop - 7,
    firstFeather,
    headTop
  );
  this.context.fill();

  this.context.beginPath();
  this.context.fillStyle = "#77B5FE";
  const secondFeather = widthRepere * 2;
  this.context.moveTo(secondFeather, headTop);
  this.context.quadraticCurveTo(
    secondFeather - 6,
    headTop - 7,
    secondFeather,
    headTop - 20
  );
  this.context.quadraticCurveTo(
    secondFeather + 6,
    headTop - 7,
    secondFeather,
    headTop
  );
  this.context.fill();

  this.context.beginPath();
  this.context.fillStyle = "#FDFD69";
  const lastFeather = this.width - 5;
  this.context.moveTo(lastFeather, headTop);
  this.context.quadraticCurveTo(
    lastFeather - 6,
    headTop - 7,
    lastFeather,
    headTop - 20
  );
  this.context.quadraticCurveTo(
    lastFeather + 6,
    headTop - 7,
    lastFeather,
    headTop
  );
  this.context.fill();
}

export function drawShaman() {
  this.hasInInventory = () => false;
  const frame = animations["idle"].frames[0];
  drawHero.bind(this)(frame);
  drawMask.bind(this)();
}

export function drawShamanGhost() {
  this.context.beginPath();
  this.context.fillStyle = "#c5e9b1";
  this.context.strokeStyle = "#daffc5";
  this.context.lineWidth = 15
  this.context.arc(
    this.width / 7,
    0,
    this.width,
    0,
    2 * Math.PI,
    false
  );
  this.context.fill();
  this.context.stroke();

  drawMask.bind(this)();
}

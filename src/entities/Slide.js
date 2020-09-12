export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#e6de63";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();

  this.context.beginPath();
  this.context.strokeStyle = "#277ae1";
  this.context.lineWidth = 2;
  this.context.moveTo(0, -2);
  this.context.lineTo(0, this.height - 2);
  this.context.moveTo(5, -2);
  this.context.lineTo(5, this.height - 2);

  this.context.moveTo(this.width, -2);
  this.context.lineTo(this.width, this.height - 2);
  this.context.moveTo(this.width - 5, -2);
  this.context.lineTo(this.width - 5, this.height - 2);
  this.context.stroke();
}

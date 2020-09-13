export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#277ae1";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();

  this.context.beginPath();
  this.context.fillStyle = "#cc4a38";
  this.context.moveTo(0, -2);
  this.context.lineTo(0, this.height - 2);
  this.context.lineTo(5, (this.height - 2) / 2);
  this.context.lineTo(0, -2);

  this.context.moveTo(this.width, -2);
  this.context.lineTo(this.width, this.height - 2);
  this.context.lineTo(this.width - 5, (this.height - 2) / 2);
  this.context.lineTo(this.width, -2);
  this.context.fill();
}

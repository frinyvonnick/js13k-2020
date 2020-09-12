export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#cc4a38";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();
}

export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#e6de63";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();
}

export function render() {
  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;
  this.context.fillStyle = this.computedColor;
  this.context.rect(0, 0, this.width, this.height);
  this.context.fill();
}

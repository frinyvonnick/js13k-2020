export function render() {
  this.context.fillStyle = this.computedColor;
  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;
  this.context.moveTo(-this.width / 2, this.hillHeight - this.height);
  this.context.quadraticCurveTo(
    this.hillWidth / 2 - this.width / 2,
    -this.height,
    this.hillWidth - this.width / 2,
    this.hillHeight - this.height
  );
  this.context.fill();
}

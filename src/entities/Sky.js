export function render() {
  this.context.beginPath();
  const gradient = this.context.createLinearGradient(0, this.height, 0, 0);
  gradient.addColorStop(0, this.lightColor);
  gradient.addColorStop(1, this.color);
  this.context.fillStyle = gradient;
  this.context.fillRect(0, 0, this.width, this.height);
}

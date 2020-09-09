export function render() {
  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;

  const foliagePath = new Path2D();
  foliagePath.arc(
    this.foliageRadius,
    this.foliageRadius,
    this.foliageRadius,
    0,
    2 * Math.PI
  );
  this.context.fillStyle = this.foliageComputedColor;
  this.context.fill(foliagePath);

  this.context.fillStyle = this.trunkComputedColor;
  this.context.fillRect(
    this.foliageRadius - this.trunkWidth / 2,
    this.foliageRadius,
    this.trunkWidth,
    this.trunkHeight
  );
}

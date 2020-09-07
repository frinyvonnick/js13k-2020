export function render() {
  const shadowFoliageRadius = Math.round(this.height / 2);
  const foliageRadius = this.height;
  this.width = foliageRadius * 2 + shadowFoliageRadius;
  this.context.beginPath();
  this.context.filter = `blur(${this.blur}px)`;

  this.context.fillStyle = this.foliageShadowComputedColor;
  const shadowFoliagePath = new Path2D();
  shadowFoliagePath.arc(
    shadowFoliageRadius,
    foliageRadius,
    shadowFoliageRadius,
    0,
    Math.PI,
    true
  );
  this.context.fill(shadowFoliagePath);

  this.context.fillStyle = this.foliageComputedColor;
  const foliagePath = new Path2D();
  foliagePath.arc(
    foliageRadius + shadowFoliageRadius,
    foliageRadius,
    foliageRadius,
    0,
    Math.PI,
    true
  );
  this.context.fill(foliagePath);
}

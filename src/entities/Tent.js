export function render() {
  this.context.beginPath();
  this.context.fillStyle = this.computedColor;

  const topWidth = this.width / 6
  const topX = this.width / 2 - topWidth / 2

  const topY = this.height / 8

  this.context.save()
  this.context.moveTo(topX, 0)
  this.context.lineTo(topX + topWidth, 0)
  this.context.lineTo(this.width / 2, topY)
  this.context.lineTo(topX, 0)

  this.context.clip();
  this.context.fillRect(0, 0, this.width, topY)
  this.context.fillStyle = this.patternComputedColor;
  this.context.fillRect(0, 0, this.width, topY / 2)
  this.context.restore();

  this.context.beginPath();
  this.context.save()
  this.context.fillStyle = this.computedColor;
  this.context.moveTo(this.width / 2, topY)
  this.context.lineTo(this.width, this.height)
  this.context.lineTo(0, this.height)
  this.context.lineTo(this.width / 2, topY)

  this.context.clip();
  this.context.fillRect(0, topY, this.width, this.height)
  this.context.fillStyle = this.patternComputedColor;
  this.context.fillRect(0, this.height - topY, this.width, this.height)
  this.context.restore();
}


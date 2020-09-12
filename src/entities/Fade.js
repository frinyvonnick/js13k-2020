export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#277ae1";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();

  this.context.beginPath();
  this.context.strokeStyle = "#cc4a38";
  this.context.lineWidth = 2;
  this.context.arc(
    0,
    this.height / 2 - 2,
    (this.height - 2) / 2,
    1.5 * Math.PI,
    2.5 * Math.PI,
    false
  );
  this.context.moveTo(this.width, this.height - 2);
  this.context.arc(
    this.width,
    this.height / 2 - 2,
    (this.height - 2) / 2,
    2.5 * Math.PI,
    1.5 * Math.PI,
    false
  );
  this.context.stroke();
}

export function update(dt = 1 / 60) {
  if (this.isFading === true) {
    if (!Number(this._a)) {
      this._a = 0;
    }
    this._a++;

    if (this._a / 60 > 1) {
      this.opacity = 0;
    }

    if (this._a / 60 > 6) {
      this.opacity = 1;
      this._a = 0;
      this.isFading = false;
    }
  }
}

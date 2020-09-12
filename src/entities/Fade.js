export function render() {
  this.context.beginPath();
  this.context.fillStyle = "#277ae1";
  this.context.rect(0, -2, this.width, this.height);
  this.context.fill();
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

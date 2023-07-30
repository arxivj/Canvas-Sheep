export class MShape {
  constructor(x, y, size) {
    this.x = x;  // x 위치
    this.y = y;  // y 위치
    this.size = size;  // M 크기
  }

  draw(ctx) {
    ctx.lineWidth = 10;

    const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.size * 2, this.y);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'black');
    gradient.addColorStop(1, 'blue');
    ctx.strokeStyle = gradient;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size / 2, this.y - this.size);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x + this.size * 1.5, this.y - this.size);
    ctx.lineTo(this.x + this.size * 2, this.y);
    ctx.stroke();
  }
}

import { MShape } from './mShape.js';

export class Sun{
  constructor(){
    this.radius = 200;


    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];
    for(let i=0; i < this.total; i++){
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }

    this.fps = 60;
    this.fpsTime = 1000 / this.fps;

    // m자 모양
    // this.mshape = new MShape(300, 300, 100);
  }

  resize(stageWidth, stageHeight){
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = this.stageWidth - this.radius - 140;
    this.y = this.radius + 100;
  }

  draw(ctx, t){
    ctx.fillStyle = '#ffb200';
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    let pos = this.pos[0];
    ctx.moveTo(pos.x + this.x, pos.y + this.y);
    for(let i=1; i<this.total; i++){
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }

    ctx.fill();
    // this.mshape.draw(ctx);
  }


  updatePoints(){
    for(let i=1; i<this.total; i++){
      const pos  = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.ranInt(5),
        y: pos.y + this.ranInt(5)
      }
    }
  }

  ranInt(max) {
    return Math.random() * max;
  }


  getCirclePoint(radius, t){
    const theta = Math.PI * 2 * t;

    return{
      x: (Math.cos(theta) * radius),
      y: (Math.sin(theta) * radius)
    }
  }


}
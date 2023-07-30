export class Hill {
  constructor(color, speed, total){
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    //포인트 배열을 생성해서 포인트를 저장
    //각 좌표의 x값은 -2를 통해 넓게 잡아서 자연스럽게 요소가 이동하도록 구현
    this.points = [];
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for(let i = 0; i < this.total; i++){
      this.points[i] = {
        x: i * this.gap,
        y: this.getY()
      }
    }
  }

  // hill을 그리는 함수
  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    // 곡선 좌표를 양의 좌표를 찾는데 써야해서 dots라는 배열에 저장하고
    let dots = [];

    // x좌표에 speed를 더해주면 움직임
    cur.x += this.speed;
    

    // x좌표의 시작점이 화면 밖으로 나오기 전에 새로운 언덕을 추가
    if(cur.x > -this.gap){
      this.points.unshift({
        x: -(this.gap *2),
        y: this.getY()
      });
    } else if (cur.x > this.stageWidth + this.gap){
      this.points.splice(-1);
    }
    // 화면에서 일정영역 이상 사라지면 배열에서 빼줘서 배열을 관리한다 






    ctx.moveTo(cur.x, cur.y);
    
    let prevCy = cur.y;
    let prevCx = cur.x;

    for ( let i = 1; i < this.points.length; i++){
      cur = this.points[i];
      //추가
      cur.x += this.speed;

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      // 이를 return 값으로 넘겨준다
      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      })

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x,this.stageHeight);
    ctx.fill();

    return dots;
  }


  // hill의 y값을 랜덤으로 주기위해
  getY(){
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + Math.random() * max;
  }


}
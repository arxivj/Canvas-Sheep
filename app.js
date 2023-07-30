import { Sun } from './sun.js';
import { Hill } from './hill.js'
import { SheepController } from './sheep-controller.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas'); //canvas라는 html 요소를 생성하고, App클래스의 canvas 프로퍼티에 담는다
    this.ctx = this.canvas.getContext("2d"); // 2d로 ㄱ
    document.body.appendChild(this.canvas); // App 클래스의 canvas 프로퍼티를 html의 body에 붙인다/


  // Hill
    this.hills = [
      new Hill('#6d6bea', 0.2, 12),
      new Hill('#ff59c2', 0.5, 8),
      new Hill('#ff4674', 1.4, 6)
    ];

    //Sheep Controller
    this.SheepController = new SheepController();

// Sun
    this.sun = new Sun();
    // this.lastRender = Date.now();
    
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();  

    requestAnimationFrame(this.animate.bind(this));
  }


  resize(){
  
// Resize
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    
    this.ctx.scale(2,2);  

    
//  Hill
    for(let i=0; i< this.hills.length; i++){
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    // Sheep Cont
    this.SheepController.resize(this.stageWidth, this.stageHeight);

// Sun
    this.sun.resize(this.stageWidth, this.stageHeight);


  }

  animate(t){
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.sun.updatePoints();
    this.sun.draw(this.ctx, t);
    
    let dots;
    for(let i=0; i<this.hills.length; i++){
      dots = this.hills[i].draw(this.ctx);
    }
    
    this.SheepController.draw(this.ctx, t, dots);
    
    // const now = Date.now();
  // if (now - this.lastRender >= this.sun.fpsTime) {
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
 
    // this.lastRender = now;
  // }
  // requestAnimationFrame(this.animate.bind(this));
  }

}

window.onload = () => {
  new App();
}
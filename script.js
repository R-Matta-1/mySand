const maxX = 1000;
const maxY = 500;



var canvas = document.getElementById("c")
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove",)

ctx.imageSmoothingEnabled = false;
canvas.width = maxX;
canvas.height = maxY;
ctx.fillRect(100, 100, 100, 100)

class particle {

    constructor() {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        

    }
    act() {

    }
    draw() {
        ctx.fillStyle = color;
        ctx.fillRect(x,y,particleSize,particleSize)
    }



}
 

for (let i = 0; i <= maxX; i+= maxX/5) {
    ctx.fillRect(i,50,25,25)

}
ctx.fillRect(maxX-10,maxY-10,50,50)
const maxX = 1000;
const maxY = 500;
const particleSize = 5;


var canvas = document.getElementById("c")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
canvas.width = maxX;
canvas.height = maxY;

var mouseX=0;
var mouseY=0;

function mouseMove(event) {
    mouseX = event.clientX - event.currentTarget.offsetLeft;
	mouseY = event.clientY - event.currentTarget.offsetTop;
    ctx.fillRect(mouseX,mouseY,10,10);
}
canvas.addEventListener("mousemove",mouseMove)

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
        ctx.fillRect(x*particleSize,y*particleSize,particleSize,particleSize)
    }



}
 


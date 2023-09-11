const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;


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

    constructor(x,y,color,type) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
    }
    act() {

    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*particleSize,this.y*particleSize,particleSize,particleSize)
    }
}
//initalizing the particles
var particles = [];
for (let x = 0;  x< (maxX / particleSize); x++) {
    particles.push([]);

    for (let y = 0; y < (maxY / particleSize); y++) {
        particles[x].push(new particle(x, y, "black", "empty"))
    }
}
console.log(particles.length);



function drawScreen() {
    ctx.fillStyle = "black";
    ctx.clearRect(0,0,maxX,maxY)
    for (let x = 0; x < particles.length; x++) {
        for (let y = 0; y < particles[x].length; y++) {
            particles[x][y].draw();
        }
    }
}

function updateScreen() {
    for (let x = 0; x < particles.length; x++) {
        for (let y = 0; y < particles[x].length; y++) {
            particles[x][y].act();
        }
    }
}

function tick() {

    updateScreen()

    drawScreen();

    requestAnimationFrame(tick)
}

tick();
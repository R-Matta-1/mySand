const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;


const types ={
empty:0, 
sand: 1,

}
//////////////volors///////////
const sandR =255;
const sandG =204
const SandB =77;//0

///////////////////////////////

var canvas = document.getElementById("c")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
canvas.width = maxX;
canvas.height = maxY;

var mouseX = 0;
var mouseY = 0;
var mouseDown = false;

//////////////////////////////event listner land////////////////
function mouseMove(event) {
    mouseX = Math.floor((event.clientX - event.currentTarget.offsetLeft)/particleSize);
    mouseY =  Math.floor((event.clientY - event.currentTarget.offsetTop)/particleSize);
}
canvas.addEventListener("mousemove", mouseMove)

function mouseDo() {
    mouseDown = true;
}
function mouseUp() {
    mouseDown = false;
}
canvas.addEventListener("mousedown", mouseDo)
canvas.addEventListener("mouseup", mouseUp)

//////////////////////////////event listner land////////////////


class particle {

    constructor(x, y, r, g, b, type) {
        this.x = x;
        this.y = y;
        this.bottomValid = (this.y+1<maxY/particleSize)
        this.topValid = (this.y-1>0)
        this.leftValid = (this.x-1>0)
        this.rightValid = (this.x+1<maxX/particleSize)
        this.type = type;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    act() {

         switch (this.type) {
           case types.sand:
            
            if (this.bottomValid) {
                if (particles[this.x][this.y+1].type == types.empty) {
                 
               
                    particles[this.x][this.y+1].r= sandR;
                    particles[this.x][this.y+1].g= sandG;
                    particles[this.x][this.y+1].b= sandB;
                    particles[this.x][this.y+1].type = types.sand;
                }
            }
                break;
        
            default:
                break;
        }

    }
    draw() {
        ctx.fillStyle = "rgb(" + this.r.toString() + "," + this.g.toString() + "," + this.b.toString() + ")";
        ctx.fillRect(this.x * particleSize, this.y * particleSize, particleSize, particleSize)
    }
}

//initalizing the particles
var particles = [];
for (let x = 0; x < (maxX / particleSize); x++) {
    particles.push([]);

    for (let y = 0; y < (maxY / particleSize); y++) {
        particles[x].push(new particle(x, y, 0, 0, 0, types.empty))
    }
}
console.log(particles.length);



function drawScreen() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, maxX, maxY)
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

    if (mouseDown) {
        particles[mouseX][mouseY].r = sandR;
        particles[mouseX][mouseY].g = sandG;
        particles[mouseX][mouseY].b = SandB;
        particles[mouseX][mouseY].type = types.sand;
        
        ctx.fillRect(mouseX, mouseY, 10, 10);
    }

    updateScreen()

    drawScreen();

    requestAnimationFrame(tick)
}

tick();
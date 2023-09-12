const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;



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
    mouseX = event.clientX - event.currentTarget.offsetLeft;
    mouseY = event.clientY - event.currentTarget.offsetTop;
    ctx.fillRect(mouseX, mouseY, 10, 10);
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
        this.type = type;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    act() {

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
        particles[x].push(new particle(x, y, 255, 255, 0, "empty"))
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
        particles[Math.floor(mouseX / particleSize)][Math.floor(mouseY / particleSize)].g = 0;
        ctx.fillRect(mouseX, mouseY, 10, 10);
    }

    updateScreen()

    drawScreen();

    requestAnimationFrame(tick)
}

tick();
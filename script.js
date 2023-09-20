const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;


const type = {
    sand: {
      id: 1,
      r: 255,
      g: 204,
      b: 50,
      density: 0.2,
    },
    empty: {
      id: 0, 
      r: 0,
      g: 0,
      b: 0,
      density: 0,
    },
    huegene:{
        id:3,
        r:175,
        g:0,
        b:255,
        density:1,
    }
  }

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
  
        this.type = type;
        this.r = r;
        this.g = g;
        this.b = b;
        this.color;
        this.updateColor(this.r,this.g,this.b)

        this.acted = false;
    }
    act() {
       
        switch (this.type) {
            //////////////////////////////////////////////////
          case type.sand.id:
                if (this.checkType(0, 1) == type.empty.id) {
                    this.transfer(0, 1);
                    break;
                }
                let LD = this.checkType(-1, 1) == type.empty.id
                let RD = this.checkType(1, 1) == type.empty.id
                if (LD && RD) {
                    (Math.random() > .5) ? this.transfer(-1, 1) : this.transfer(-1, 1);
                    break;
                }
                if (LD) { (Math.random() > type.sand.density) ? this.transfer(-1, 1) : null; break; }
                if (RD) { (Math.random() > type.sand.density) ? this.transfer( 1, 1) : null; break; }

            break;
            ////////////////////////////////////////////////////////
          default:
            break;
        }
      }


      transfer(x,y){
  if (this.checkValid(x,y)) {
let other = particles[this.x + x][this.y + y]

var temp = this.r;
this.r = other.r;
other.r = temp;

var temp = this.g;
this.g = other.g;
other.g = temp;

var temp = this.b;
this.b = other.b;
other.b = temp;

var temp = this.type;
this.type = other.type;
other.type = temp;

other.updateColor(other.r,other.g,other.b)
other.acted = true;

this.updateColor(this.r,this.g,this.b)


  }
    }
    updateColor(r, g, b) {

        this.r = r;
        this.g = g;
        this.b = b;

        this.color = "rgb(" + this.r + "," + this.g + "," + this.b + ")";

    }
checkValid(x,y){
    let newX = this.x+x;
    let newY = this.y+y;
    return (newY<particles[this.x].length-1 &&newY>0 && newX >0 && newX<particles.length-1);
}
checkType(x,y){
    return particles[this.x+x][this.y+y].type;
}
   draw() {
 (ctx.fillStyle != this.color)? ctx.fillStyle = this.color:null;
  ctx.fillRect(this.x * particleSize, this.y * particleSize, particleSize, particleSize)
}
}

//initalizing the particles
var particles = [];
for (let x = 0; x < (maxX / particleSize); x++) {
    particles.push([]);

    for (let y = 0; y < (maxY / particleSize); y++) {
        particles[x].push(new particle(x, y, 0, 0, 0, type.empty.id))
    }
}





console.log(particles.length);

function drawScreen() {

    for (let x = 0; x < particles.length; x++) {
        for (let y = 0; y < particles[x].length; y++) {
            particles[x][y].draw();
        }
    }
}

var updateAmount = 2;
function updateScreen() {
    //
    for (let i = 0; i < updateAmount; i++) {
        

        for (let x = i; x < particles.length; x += updateAmount) {
            for (let y = 0; y < particles[x].length; y ++) {

                if (!particles[x][y].acted) {
                    particles[x][y].act();
                }
                particles[x][y].acted = false;
            }
        }
    }
 

}
function clickInteraction() {
    if (mouseDown) {
        for (let i = -5; i < 5; i++) {
            if (mouseY > 0 && mouseX + i > 0 && mouseX + i < particles.length - 1 && mouseY < particles[1].length - 1) {

                particles[mouseX + i][mouseY].updateColor(type.sand.r, type.sand.g, type.sand.b)
                particles[mouseX + i][mouseY].type = type.sand.id;

                ctx.fillRect(mouseX, mouseY, 10, 10);
            }
        }
    }
}
function tick() {
    clickInteraction()
    updateScreen()
    drawScreen();
    requestAnimationFrame(tick)
}
tick();


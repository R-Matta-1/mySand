const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;


const types ={
empty:0, 
sand: 1,

}
//////////////colors///////////
///stylized in a MAT format 
const typeR =      [0,255];
const typeG =      [0,204];
const typeB =      [0, 50];
const typeDensity =[0, 0];

 
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
  
        this.type = type;
        this.r = r;
        this.g = g;
        this.b = b;
        this.color;
        this.updateColor(this.r,this.g,this.b)

        this.acted = false;
    }
    act() {
       // this.acted = true;
        switch (this.type) {
            //////////////////////////////////////////////////
          case types.sand:
            if (this.checkType(0,1) == types.empty) {
              this.transfer(0, 1, 0, 0, 0, types.empty)
            } else {
             let LDClear = this.checkType(-1,1) == types.empty;
             let RDClear = this.checkType(1,1) == types.empty;
                
            if (LDClear && RDClear) {
                (Math.random()>.5)? this.transfer(-1,1,0,0,0,types.empty):this.transfer(1,1,0,0,0,types.empty);
            } else if(RDClear){
                (Math.random() > typeDensity[types.sand]) ? this.transfer(1,1,0,0,0,types.empty):null;
            } else if (LDClear) {
                (Math.random() > typeDensity[types.sand]) ? this.transfer(-1, 1, 0, 0, 0, types.empty) : null;
            }
        }
            break;
            ////////////////////////////////////////////////////////
          default:
            break;
        }
      }
    transfer(x,y,r,g,b,replaceType){
  if (this.checkValid(x,y)) {
    

      particles[this.x + x][this.y + y].updateColor(this.r,this.g,this.b)
        particles[this.x+x][this.y + y].type = this.type;
        particles[this.x+x][this.y + y].acted = true;

      this.updateColor(typeR[replaceType], typeG[replaceType], typeB[replaceType])
        this.type = replaceType;
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
    return (newY<particlesRead[this.x].length-1 &&newY>0 && newX >0 && newX<particlesRead.length-1);
}
checkType(x,y){
    return particlesRead[this.x+x][this.y+y].type;
}
   draw() {
  ctx.fillStyle = this.color
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
var particlesRead  = structuredClone(particles);

//cloneParticleWorld(particlesRead,particlesFrom)


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

var updateSwap = true;
function updateScreen() {
if (updateSwap) {
    for (let x = 0; x < particles.length; x++) {
        for (let y = 0; y < particles[x].length; y++) {

           if(!particles[x][y].acted){
            particles[x][y].act();}
            particles[x][y].acted = false;
        }
    }
} else {
    for (let x = particles.length-1; x >= 0; x--) {
     for (let y = 0; y < particles[x].length; y++) {

        if(!particles[x][y].acted){
          particles[x][y].act();
        }
          particles[x][y].acted = false;
        }
    }
}
updateSwap = !updateSwap;
}

function tick() {

if (mouseDown) {
      for (let i = -5; i < 5; i++) {
        if  (mouseY>0 && mouseX+i >0 && mouseX+i<particles.length-1&& mouseY<particles[1].length-1 ) {
       
        particles[mouseX+i][mouseY].r = typeR[types.sand];
        particles[mouseX+i][mouseY].g = typeG[types.sand];
        particles[mouseX+i][mouseY].b = typeB[types.sand];
        particles[mouseX+i][mouseY].type = types.sand;
        
        ctx.fillRect(mouseX, mouseY, 10, 10);
    }}}

   particlesRead = structuredClone(particles);
   updateScreen()
  
    drawScreen();

    requestAnimationFrame(tick)
}

tick();



const particleSize = 5;
const maxX = 1000 - particleSize;
const maxY = 500 - particleSize;

const type = {
    sand: {
      r: 255,
      g: 204,
      b: 50,
      density: 0.2,
    },
    empty: {
      r: 0,
      g: 0,
      b: 0,
      density: 0,
    },
    wall:{
        r:119,
        g:119,
        b:119,
        density:1,
    },
    huegene:{
          //212, 19, 255
        r:212,
        g:19,
        b:255,
        density:1,
    },
		water:{
          //44, 32, 201
			r:44,
			g:32,
			b:201,
			density:0.1,},
      fire :{
         //242, 84, 31
        r:242,
        g:84,
        b:31,
        density:0.0,
      }
  }

var canvas = document.getElementById("c")
var ctx = canvas.getContext("2d",{alpha:false});
ctx.imageSmoothingEnabled = false;
canvas.width = maxX;
canvas.height = maxY;

var widthRange = document.getElementById("width")
var heightRange = document.getElementById("height")
var placeWidth = 10;
var placeHeight = 1;
var placeHeightDensity = 1;
var placeWidthDensity = 1;

var mouseX = 0;
var mouseY = 0;
var mouseDown = false;
var recentKey = 0;
var gamePaused = false;

var placeType = type.sand
var placeR = type.sand.r
var placeG = type.sand.g
var placeB = type.sand.b
//////////////////////////////event listner land////////////////
function mouseMove(event) {
  
       mouseX =Math.floor((event.clientX - canvas.offsetLeft)/particleSize*1.1)
       mouseY =Math.floor((event.clientY - canvas.offsetTop )/particleSize*1.1)
       placeHeight=1;
       placeWidth = parseInt(widthRange.value)
       placeHeight = parseInt(heightRange.value)
}
document.addEventListener("mousemove", mouseMove)

function mouseDo() {
    mouseDown = true;
    
}
function mouseUp() {
    mouseDown = false;
}
canvas.addEventListener("mousedown", mouseDo)
canvas.addEventListener("mouseup", mouseUp)

document.onkeydown = keypress;
function keypress(event) {
   recentKey = event.key
placeSwitch(recentKey)
}

function placeSwitch(par) {

  switch (par) {
    case "1":
         placeType = type.sand
         placeR = type.sand.r
         placeG = type.sand.g
         placeB = type.sand.b
        break;
        case "2":
            placeType = type.wall
            placeR = type.wall.r
            placeG = type.wall.g
            placeB = type.wall.b
           break;
    case "0":
        placeType = type.empty
         placeR = type.empty.r
         placeG = type.empty.g
         placeB = type.empty.b
    break;
    case "3":
        placeType = type.huegene
         placeR = type.huegene.r
         placeG = type.huegene.g
         placeB = type.huegene.b
    break;
		case "4":
			placeType = type.water
			 placeR = type.water.r
			 placeG = type.water.g
			 placeB = type.water.b
       break;
    case "5":
        placeType = type.fire
         placeR = type.fire.r
         placeG = type.fire.g
         placeB = type.fire.b
	break;
  case " ":
    gamePaused = !gamePaused;
    break;
    ///////////edit the width and height througth updown left right
    case "ArrowUp":

      break;
    case "ArrowDown":
     break;
      case "ArrowLeft":
     break;
     case "ArrowRight":
      break;
    default:
        break;
}
}
//////////////////////////////event listner land End////////////////



class particle {
    constructor(x, y, r, g, b, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.r = r;
      this.g = g;
      this.b = b;
      this.color;
      this.updateColor(this.r, this.g, this.b)
      this.acted = false;
    }
    act() {
      switch (this.type) {
        //////////////////////////////////////////////////
        case type.sand:
          if (this.checkType(0, 1).density < type.sand.density) {
            this.transfer(0, 1);
            break; 
          }
          let LDsa = this.checkType(-1, 1) == type.empty
          let RDsa = this.checkType(1, 1) == type.empty
          if (LDsa && RDsa) {
            (Math.random() > .5) ? this.transfer(1, 1): this.transfer(-1, 1);
            break;
          }
          if (LDsa) {
            (Math.random() > type.sand.density) ? this.transfer(-1, 1): null;
            break;
          }
          if (RDsa) {
            (Math.random() > type.sand.density) ? this.transfer(1, 1): null;
            break;
          }
          break;
          ////////////////////////////////////////////////////////
        case type.huegene:
     
      if (this.checkType(0, 1) == type.empty) {  //grav
            this.transfer(0, 1);
            break;
          }
          let LDhu = this.checkType(-1,1) == type.empty
          let RDhu = this.checkType(1,1 ) == type.empty
          if (LDhu && RDhu) {
            (Math.random() > .5) ? this.transfer(-1, 1): this.transfer(1, 1);
            break;
         }
         if (LDhu) {
            (Math.random() > type.sand.density) ? this.transfer(-1, 1): null;
            break;
          }
          if (RDhu) {
            (Math.random() > type.sand.density) ? this.transfer(1, 1): null;
            break;
         }
          let randR = Math.max(Math.min(this.r + Math.floor((Math.random() * 50) - 25), 255), 0);
          let randG = Math.max(Math.min(this.g + Math.floor((Math.random() * 50) - 25), 255), 0);
          let randB = Math.max(Math.min(this.b + Math.floor((Math.random() * 50) - 25), 255), 0);
          switch (Math.floor(Math.random() * 4)) {
            case 0:
              if (this.checkType(0, 1) == type.empty) {
                this.place(0,1, randR, randG, randB, type.huegene)
              }
              break;
            case 1:
              if (this.checkType(1, 0) == type.empty) {
                this.place(1, 0, randR, randG, randB, type.huegene)
              }
              break;
            case 2:
              if (this.checkType(0, -1) == type.empty) {
                this.place(0, -1, randR, randG, randB, type.huegene)
              }
              break;
            case 3:
              if (this.checkType(-1, 0) == type.empty) {
                this.place(-1, 0, randR, randG, randB, type.huegene)
              }
              break;
            default:
              break;
          }
          break;
          ////////////////////////////////////////////////////////
	   case type.water:
if (this.checkType(0,1) == type.empty) {
	this.transfer(0,1);
}
let LDwa = (this.checkType(-1, 0) == type.empty)
              let RDwa = (this.checkType(1, 0) == type.empty)
if (LDwa && RDwa) {
	(Math.random() > .5) ? this.transfer(1, 0): this.transfer(-1, 0);
	break;
}
if (RDwa) {
    (Math.random() > type.water.density) ? this.transfer(1, 0) : null;
  break;
}
if (LDwa) {
    (Math.random() > type.water.density) ? this.transfer(-1, 0) : null;
	break;
}
//////////////////////////////////////////////////////////////
	break;
    case type.fire:
      this.r -= Math.floor(Math.random()*10)
      if(this.r<150 || Math.random()<0.1){
        this.place(0,0,0,0,0,type.empty)
      }
if (this.checkType(0,-1)== type.empty) {
this.transfer(0,-1)
}
  break;
  default:
          break;
      }
    }

    transfer(x, y) {
      if (this.checkValid(x, y)) {
        let other = particles[this.x + x][this.y + y]
        var temp = this.r;
        this.r = other.r;
        other.r = temp;
        temp = this.g;
        this.g = other.g;
        other.g = temp;
        temp = this.b;
        this.b = other.b;
        other.b = temp;
        temp = this.type;
        this.type = other.type;
        other.type = temp;
        other.updateColor(other.r, other.g, other.b)
        other.acted = true;
        this.updateColor(this.r, this.g, this.b)
      }
    }
    place(x, y, r, g, b, t) {
      if (this.checkValid(x, y)) {
        particles[this.x + x][this.y + y].type = t
        particles[this.x + x][this.y + y].updateColor(r, g, b)
        particles[this.x + x][this.y + y].acted = true
      }
    }
    updateColor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.color = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
    checkValid(x, y) {
      let newX = this.x + x;
      let newY = this.y + y;
      return (newY < particles[this.x].length - 1 && newY > 0 && newX > 0 && newX < particles.length - 1);
    }
    checkType(x, y) {
       if( this.checkValid(x,y)){
      return particles[this.x + x][this.y + y].type;}
     else{
      return type.empty;
    }}
    draw() {
      if (this.type != type.empty) {
      (ctx.fillStyle != this.color) ? ctx.fillStyle = this.color: null;
      ctx.fillRect(this.x * particleSize, this.y * particleSize, particleSize, particleSize)
    }}
  }

//initalizing the particles
var particles = [];
for (let x = 0; x < (maxX / particleSize); x++) {
    particles.push([]);

    for (let y = 0; y < (maxY / particleSize); y++) {
        particles[x].push(new particle(x, y, 0, 0, 0, type.empty))
    }
}

 
function drawScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < particles.length; x++) {
        for (let y = 0; y < particles[x].length; y++) {
            
                particles[x][y].draw()
        }
    }
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo((mouseX+1+placeWidth /2)*particleSize,( mouseY+1+placeHeight/2 )*particleSize);
    ctx.lineTo((mouseX+1+placeWidth /2)*particleSize,( mouseY-placeHeight/2 )*particleSize);
    ctx.lineTo((mouseX-1-placeWidth /2)*particleSize,( mouseY-placeHeight/2 )*particleSize);
    ctx.lineTo((mouseX-1-placeWidth /2)*particleSize,( mouseY+1+placeHeight/2 )*particleSize);
    ctx.lineTo((mouseX+1+placeWidth /2)*particleSize,( mouseY+1+placeHeight/2 )*particleSize)
    ctx.stroke();
}

var updateAmount = 2;
var updateSwap = true;
function updateScreen() {
if (gamePaused) {
  return;
}


  if (updateSwap) {
    for (let i = 0; i < updateAmount; i++) {
      for (let x = particles.length-1-i; x >= 0; x -= updateAmount) {
          for (let y = 0; y < particles[x].length; y++) {
            let  curnt = particles[x][y]

              if (!curnt.acted) {
                  curnt.act();
              }
              curnt.acted = false;
          }
      }
  }
 }  else {
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
updateSwap = !updateSwap
}
function clickInteraction() {

    if (mouseDown) {
     let Xstart = placeWidth*-0.5;
     let Xlimit = placeWidth*0.5;
     let Ystart = placeHeight*-0.5;
     let Ylimit = placeHeight*0.5;

        for (let i = Xstart-1; i <= Xlimit; i++) {
          for (let y = Ystart; y < Ylimit+1; y++) {
            if (mouseY+y > 0 && mouseX + i > 0 && mouseX + i < particles.length - 1 && mouseY+y < particles[1].length - 1) {

                particles[mouseX + i][mouseY+y].updateColor(placeR, placeG, placeB)
                particles[mouseX + i][mouseY+y].type = placeType;

              
            }
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
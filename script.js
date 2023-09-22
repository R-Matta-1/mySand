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
    wall:{
        id:2,
        r:119,
        g:119,
        b:119,
        density:1,
    },
    huegene:{
        id:3,    //212, 19, 255
        r:212,
        g:19,
        b:255,
        density:1,
    },
		water:{
			id:4,    //44, 32, 201
			r:44,
			g:32,
			b:201,
			density:0.01,
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
var recentKey = 0;

var placeType = type.sand.id
var placeR = type.sand.r
var placeG = type.sand.g
var placeB = type.sand.b
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

document.onkeydown = keypress;
function keypress(event) {
   recentKey = event.key
   switch (recentKey) {
    case "1":
         placeType = type.sand.id
         placeR = type.sand.r
         placeG = type.sand.g
         placeB = type.sand.b
        break;
        case "2":
            placeType = type.wall.id
            placeR = type.wall.r
            placeG = type.wall.g
            placeB = type.wall.b
           break;
    case "0":
        placeType = type.empty.id
         placeR = type.empty.r
         placeG = type.empty.g
         placeB = type.empty.b
    break;
    case "3":
        placeType = type.huegene.id
         placeR = type.huegene.r
         placeG = type.huegene.g
         placeB = type.huegene.b
    break;
		case "4":
			placeType = type.water.id
			 placeR = type.water.r
			 placeG = type.water.g
			 placeB = type.water.b
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
        case type.sand.id:
          if (this.checkType(0, 1) == type.empty.id) {
            this.transfer(0, 1);
            break;
          }
          let LDsa = this.checkType(-1, 1) == type.empty.id
          let RDsa = this.checkType(1, 1) == type.empty.id
          if (LDsa && RDsa) {
            (Math.random() > .5) ? this.transfer(-1, 1): this.transfer(-1, 1);
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
        case type.huegene.id:
          let randR = Math.max(Math.min(this.r + Math.floor((Math.random() * 30) - 15), 255), 0);
          let randG = Math.max(Math.min(this.g + Math.floor((Math.random() * 30) - 15), 255), 0);
          let randB = Math.max(Math.min(this.b + Math.floor((Math.random() * 30) - 15), 255), 0);
          switch (Math.floor(Math.random() * 4)) {
            case 0:
              if (this.checkType(0, 1) == type.empty.id) {
                this.place(0,1, randR, randG, randB, type.huegene.id)
              }
              break;
            case 1:
              if (this.checkType(1, 0) == type.empty.id) {
                this.place(1, 0, randR, randG, randB, type.huegene.id)
              }
              break;
            case 2:
              if (this.checkType(0, -1) == type.empty.id) {
                this.place(0, -1, randR, randG, randB, type.huegene.id)
              }
              break;
            case 3:
              if (this.checkType(-1, 0) == type.empty.id) {
                this.place(-1, 0, randR, randG, randB, type.huegene.id)
              }
              break;
            default:
              break;
          }
          break;
          ////////////////////////////////////////////////////////
					case type.water.id:
if (this.checkType(0,1) == type.empty.id) {
	this.transfer(0,1);

}
let LDwa = (this.checkType(-1, 0) == type.empty.id)
let RDwa = (this.checkType(1, 0) == type.empty.id)
if (LDwa && RDwa) {
	(Math.random() > .5) ? this.transfer(-1, 0): this.transfer(-1, 0);
	break;
}
if (RDwa) {
  this.transfer(1, 0)
  break;
}
if (LDwa) {
	 this.transfer(-1, 0)
	break;
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
    }
    draw() {
      (ctx.fillStyle != this.color) ? ctx.fillStyle = this.color: null;
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
var updateSwap = true;
function updateScreen() {
  if (updateSwap) {
    for (let i = 0; i < updateAmount; i++) {
      for (let x = particles.length-1-i; x >= 0; x -= updateAmount) {
          for (let y = 0; y < particles[x].length; y ++) {

              if (!particles[x][y].acted) {
                  particles[x][y].act();
              }
              particles[x][y].acted = false;
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
       
        for (let i = -5; i < 5; i++) {
            if (mouseY > 0 && mouseX + i > 0 && mouseX + i < particles.length - 1 && mouseY < particles[1].length - 1) {

                particles[mouseX + i][mouseY].updateColor(placeR, placeG, placeB)
                particles[mouseX + i][mouseY].type = placeType;

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


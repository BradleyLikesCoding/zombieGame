var reload = false;
var bulletsY = [];
var bulletsX = [];
var bulletsYpos = [];
var bulletsXpos = [];
var ded = 0;
var maxHard = 2;
var diff = 2500;
var eAxis = [];
var eX = [];
var eY = [];
var score = 0;
var hScore = 0;
var amo = 30;
var lives = 10;
var x = 0;
var y = 0;
var map = [
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBBBB",
]

function draw() {
  var c = document.getElementById("out");
  var ctx = c.getContext("2d")
  ctx.clearRect(0, 0, 400, 400);
  for (var yy = 0; yy < 20; yy++) {
    for (var xx = 0; xx < 20; xx++) {
      var type = map[yy][xx];
      if (x == xx && y == yy) {
        ctx.fillStyle = "#FF0000"
        ctx.fillRect(xx * 20, yy * 20, xx * 20 + 20, yy * 20 + 20);
      } else {
        var bool = false;
        ctx.fillStyle = "#cfcfcf"
        ctx.fillRect(xx * 20, yy * 20, xx * 20 + 20, yy * 20 + 20);
        if (type == "W") {
          ctx.fillStyle = "#000000"
          ctx.fillRect(xx * 20, yy * 20, xx * 20 + 20, yy * 20 + 20);
        } else if (type == "D") {
          ctx.fillStyle = "#402f2f"
          ctx.fillRect(xx * 20, yy * 20, xx * 20 + 20, yy * 20 + 20);
        }
        for (var i = 0; i < bulletsYpos.length; i++) {
          var xxx = bulletsXpos[i];
          var yyy = bulletsYpos[i];
          if (xxx == xx && yyy == yy) {
            ctx.fillStyle = "#525252";
            ctx.fillRect((xxx * 20) + 5, (yyy * 20) + 5, 10, 10);
          }
        }
      }
    }
    if(ded) {
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    }
  }
  
        for (var i = 0; i < eX.length; i++) {
          var xxx = eX[i];
          var yyy = eY[i];
            ctx.fillStyle = "#047000";
            ctx.fillRect(xxx * 20, yyy * 20, 20, 20);
        }
}
setInterval(draw, 10);

function deleteItem(array, item) {
  var returnVal = [];
  for (var i = 0; i < array.length; i++) {
    if (i != item) {
      returnVal.push(array[i]);
    }
  }
  return (returnVal);
}
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 65) {
    left();
  }
  if (event.keyCode == 87) {
    up();
  }
  if (event.keyCode == 68) {
    right();
  }
  if (event.keyCode == 83) {
    down();
  }
});

function left() {
  if (-1 + x == -1 || map[y][-1 + x] == "W") { } else {
    x--;
  }
}

function right() {
  if (1 + x == 20 || map[y][1 + x] == "W") {

  } else {
    x++;
  }
}

function up() {
  if (-1 + y == -1 || map[-1 + y][x] == "W") { } else {
    y--;
  }
}

function down() {
  if (1 + y == 20 || map[1 + y][x] == "W") { } else {
    y++;
  }
}

function updateInfo() {
  document.getElementById("info-out").innerHTML = "High Score: " + hScore + "<br>Score: " + score + "<br>Lives: " + lives + "<br>Amunition: " + amo;
}
setInterval(updateInfo, 10);

function Edge(x, y) {
  if (x == -1 || x == 20 || y == -1 || y == 20) {
    return true;
  } else if (map[y][x] == "W") {
    return true;
  } else {
    return false;
  }
}

function spawn() {
  eX.push(Math.round(Math.random() * 19));
  eY.push(19);
  if (Math.round(Math.random()) == 0) {
    eAxis.push(false);
  } else {
    eAxis.push(true);
  }
}

function move() {
  for (var i = 0; i < eX.length; i++) {
    eAxis[i] = !eAxis[i];
    if (eX[i] == x || eY[i] == y) {
      if (eX[i] == x) {
        if (eY[i] > y) {
          eY[i]--;
        } else {
          eY[i]++;
        }
      } else {
        if (eX[i] > x) {
          eX[i]--;
        } else {
          eX[i]++;
        }
      }
    } else {
      if (eAxis[i]) {
        if (eY[i] > y) {
          eY[i]--;
        } else {
          eY[i]++;
        }
      } else {
        if (eX[i] > x) {
          eX[i]--;
        } else {
          eX[i]++;
        }
      }
    }
  }
}

function harder() {
  if (diff > maxHard) {
    diff += -5;
  }
  setInterval(harder, 1000)
}
setInterval(spawn, diff);
setInterval(move, 250);

function liveCheck() {
  for (var i = 0; i < eX.length; i++) {
    if (eX[i] == x && eY[i] == y) {
      eX = deleteItem(eX, i);
      eY = deleteItem(eY, i);
      eAxis = deleteItem(eAxis, i);
      lives--;
    }
  }
  for (var i = 0; i < bulletsXpos.length; i++) {
    for (var ii = 0; ii < eX.length; ii++) {
      if (eX[ii] == bulletsXpos[i] && eY[ii] == bulletsYpos[i]) {
        bulletsX = deleteItem(bulletsX, i);
        bulletsY = deleteItem(bulletsY, i);
        bulletsXpos = deleteItem(bulletsXpos, i);
        bulletsYpos = deleteItem(bulletsYpos, i);
        eX = deleteItem(eX, ii);
        eY = deleteItem(eY, ii);
        eAxis = deleteItem(eAxis, i);
        score++;
      }
    }
  }
}
setInterval(liveCheck, 1);

function reset() {
  eX = [];
  eY = [];
  eAxis = [];
  x = 0;
  y = 0;
  lives = 10;
  diff = 2500;
  amo = 30;
  score = 0;
}
setInterval(deadCheck, 1);

function deadCheck() {
  if (lives < 1) {
    reset()
    ded = 0;
    document.getElementById("dead").innerHTML = "GAME-OVER";
    ded = true;
  }
}

function deadMSG() {
  ded = false;
  clearTimeout(d);
}

function shoot(event) {
  if (amo == 0 || amo == "Reloading...") { } else {
    amo--;
    bulletsX.push(Math.round(((event.clientX) / 20) - x) - 1);
    bulletsY.push(Math.round(((event.clientY) / 20) - y) - 7);
    if (bulletsX[bulletsX.length - 1] == 0) {
      bulletsXpos.push(x);
    } else {
      bulletsXpos.push(x + (bulletsX[bulletsX.length - 1] / Math.abs(bulletsX[bulletsX.length - 1])));
    }
    if (bulletsY[bulletsY.length - 1] == 0) {
      bulletsYpos.push(y);
    } else {
      bulletsYpos.push(y + (bulletsY[bulletsY.length - 1] / Math.abs(bulletsY[bulletsY.length - 1])));
    }
  }
  if (amo == 0) {
    var reload = true;
    amo = "Reloading...";
    setTimeout(resetAmo, 3500);
  }
}

function movebullets() {
  for (var i = 0; i < bulletsX.length; i++) {
    if (bulletsX[i] == 0) { } else {
      bulletsXpos[i] += (bulletsX[bulletsX.length - 1] / Math.abs(bulletsX[bulletsX.length - 1]));
    }
    if (bulletsY[i] == 0) { } else {
      bulletsYpos[i] += (bulletsY[bulletsY.length - 1] / Math.abs(bulletsY[bulletsY.length - 1]));
    }
  }
}
setInterval(movebullets, 100);
function resetAmo() {
  clearTimeout(resetAmo);
  amo = 30;
}
function hScoreC() {
  if(score > hScore) {
    hScore = score;
  }
}
setInterval(hScoreC, 1);
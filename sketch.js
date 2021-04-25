window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32 && e.target == document.body) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 222 && e.target == document.body) {
    e.preventDefault();
  }
});

var t = 0;
var rot_t = 0;
var full_text = "Happy 50th Birthday, Dad!!";
var userHasTyped = false;
var c = 200;
var incColor = true;
var halfWidth;
var halfHeight;

var minFontSize = 10;
var maxFontSize = 100;

var fontSize = minFontSize;

var circles = [];
var adjectives = ["cool", "nice", "funny", "athletic", "risk-taker", "epic", "awesome", "handsome", "cute", "loving", "caring", "thoughtful", "curious"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfWidth = width / 2;
  halfHeight = height / 2;
  textSize(fontSize);
  fill(190, 239, 255);

  rect(0, 0, width, height);
  // colorMode(HSB);
  translate(width / 4, height / 4);
}

function draw() {
  fill(190, 239, 255);
  rect(0, 0, width, height);
  t += 0.005;
  if (fontSize >= minFontSize) {
    fontSize -= 2 * (fontSize / maxFontSize);
  }
  // circle(0, 0, 20);
  for (let i = 0; i < circles.length; i++) {
    // console.log(circles[i]);
    // colorMode(HSB, 100);
    fill(
      circles[i]["red"] + noise(t + 100 * i) * 100,
      circles[i]["green"] + noise(t + 100 * i) * 100,
      circles[i]["blue"] + noise(t + 100 * i) * 100
    );
    // colorMode(RGB, 100);
    if (circles[i]["circle"]) {
      circle(
        circles[i]["xCoord"] + noise(t + 100 * i) * 100,
        circles[i]["yCoord"] + noise(t + 200 * i) * 100,
        circles[i]["radius"] + noise(t + 300 * i) * 100
      );
    } else {
      rect(
        circles[i]["xCoord"] + noise(t + 100 * i) * 100,
        circles[i]["yCoord"] + noise(t + 200 * i) * 100,
        circles[i]["radius"] + noise(t + 300 * i) * 100,
        circles[i]["radius"] + noise(t + 300 * i) * 100,
        10
      );
    }
    fill(0);
    text(circles[i]["word"], circles[i]["xCoord"] + noise(t + 100 * i) * 100 - 50,
    circles[i]["yCoord"] + noise(t + 200 * i) * 100);
  }
  writeText();
  // for (cir in circles) {
  //   console.log(Object.keys(cir));
  // }
}

function keyPressed() {
  if (keyCode === ENTER) {
    t += 30;
    if (incColor) {
      c += 10;
    } else {
      c -= 10;
    }
    addCircle();
  }
}

function mouseClicked() {
  if (keyCode === ENTER) {
    t += 30;
    if (incColor) {
      c += 10;
    } else {
      c -= 10;
    }
    addCircle();
  }
}

function addCircle() {
  var x = noise(t + 100) * width * 1.5 - 200;
  var y = noise(t + 200) * height * 1.5 - 200;
  var r = noise(t + 300) * 100;

  var red = noise(t + 10) * 255;
  var green = noise(t + 20) * 255;
  var blue = noise(t + 30) * 255;

  circles.push({
    xCoord: x,
    yCoord: y,
    radius: r,
    red: red,
    green: green,
    blue: blue,
    circle: Math.random() > 0.5,
    word: adjectives[Math.floor(Math.random()*adjectives.length)]
  });
  console.log(circles);
}

function writeText() {
  if (incColor) {
    if (c >= 255) {
      incColor = false;
    } else {
      c++;
    }
  } else {
    if (c < 150) {
      incColor = true;
    } else {
      c--;
    }
  }

  var x = noise(t) * halfWidth;
  var y = noise(t + 100) * halfHeight;

  fill(c, noise(t) * 255, noise(t + 20) * 255);
  textSize(50);
  text(full_text, x, y, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

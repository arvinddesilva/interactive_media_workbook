let font = googleFont('Codystar')
let txt = 'WEB DESIGN'



function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('box1')
  textFont(font)
  textAlign(CENTER, CENTER)
  fill(255)
}

function draw() {
  background(0, 10)
  textSize(random(1, 100))
  text(txt, random(width), random(height))
}


function googleFont(fontName) {
  let link = document.createElement("link")
  link.href = "https://fonts.googleapis.com/css?family=" + encodeURI(fontName) + '&display=swap'
  link.rel = "stylesheet"
  document.head.appendChild(link)
  return fontName
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
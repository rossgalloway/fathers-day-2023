const FRAME_RATE = 30
const DURATION = FRAME_RATE * 6
let haveBallsPopped = false
let popDelay = FRAME_RATE / 8
let popFrame
let titleScale = 1.5
// these next 3 variables are determined by the text
const titleWidth = 700
const titleHeight = 410
const baselineTitleSpacing = 100
let AdditionalTitleSpacing = 0

// required offsets for flocking boids to start in the right spots
let textStart_X = (window.innerWidth - titleWidth * titleScale) / 2
let textStart_Y =
  (window.innerHeight - titleHeight * titleScale - AdditionalTitleSpacing) / 2

let textColor = 0
let thickness = 1
let flappyCounter = 0
let flappyModulo = 0
let loopNumber = 0
let pointsToAvoid = []
let gravity = 0.8

function addBalls(titleTextObjects, Balls, numPerVertex, gravity) {
  for (const titleTextObject of titleTextObjects) {
    for (const vertex of titleTextObject.offsetVertices) {
      for (let i = 0; i < numPerVertex; i++) {
        const b = new Ball(vertex[0], vertex[1], gravity)
        Balls.addBall(b)
      }
    }
  }
}

function drawCourtLines(titleWidth, titleHeight) {
  push()
  translate(
    (width - titleWidth * titleScale) / 2,
    (height - titleHeight * titleScale) / 2
  )
  line(0, 0, 0, 10000)
  line(-200, 0, -200, 10000)
  line(titleWidth * titleScale, 0, titleWidth * titleScale, 10000)
  line(titleWidth * titleScale + 200, 0, titleWidth * titleScale + 200, 10000)
  line(-200, 0, titleWidth * titleScale + 200, 0)
  line(
    0,
    titleHeight * titleScale,
    titleWidth * titleScale,
    titleHeight * titleScale
  )
  line(
    (titleWidth * titleScale) / 2,
    titleHeight * titleScale,
    (titleWidth * titleScale) / 2,
    10000
  )
  pop()
}

function drawBelated() {
  push()
  fill(255)
  strokeWeight(1)
  textSize(75)
  translate(width / 2 - 300, height / 2 + 150)
  angleMode(DEGREES)
  rotate(15)
  text('belated', 0, 0)
  translate(50, -50)
  push()
  noFill()
  strokeWeight(2)
  beginShape()
  vertex(0, 0)
  vertex(25, -25)
  vertex(50, 0)
  endShape()
  pop()
  pop()
}

function drawClickInstruction() {
  push()
  fill(255)
  strokeWeight(1)
  textSize(50)
  translate(
    (width + titleWidth * titleScale) / 2 + 200,
    (height - titleHeight * titleScale) / 2
  )
  textAlign(RIGHT, BOTTOM)
  text('click to launch the balls!', 0, 0)
  pop()
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(FRAME_RATE)
  textFont(loadFont('public/ARCHITEX.TTF'))

  /**
   * get additional points and data for text objects to draw them with anims
   */
  for (shape of textObjects) {
    getVertexArrays(shape, titleScale, textStart_X, textStart_Y)
    pointsToAvoid.push(...shape.offsetVertices)
  }
  console.log(textObjects)
  let animDuration = 0
  for (object of textObjects) {
    animDuration += object.duration
  }
  for (object of textObjects) {
    object.durationPercentage = object.duration / animDuration
  }

  // create new Flock object
  allBalls = new Balls()

  //Add boids into the system
  let ballDiameter = 25
  let dropPoints = windowWidth / ballDiameter + 1
  for (let i = 1; i < dropPoints; i++) {
    const b = new Ball(
      (i * width) / dropPoints,
      height - 50,
      gravity,
      ballDiameter
    )
    allBalls.addBall(b)
  }
}

function mouseClicked() {
  allBalls.balls.forEach((ball) => {
    ball.setVelocity(random(-10, 10), random(-30, -40))
  })
  console.log('pop!')
}

function draw() {
  background(255)
  stroke(textColor)
  strokeWeight(thickness)

  if (frameCount % 5 == 0) {
    flappyCounter++
  }

  flappyModulo = frameCount % 30
  if (flappyModulo == 0) {
    flappyCounter = 0
    loopNumber++
  }

  if (frameCount <= DURATION) {
    thickness = map(frameCount, 0, DURATION, 0, 1)
    textColor = color(0)
    r = 0
    g = 0
    b = 0
  } else if (frameCount <= DURATION + 200) {
    thickness = map(frameCount, DURATION, DURATION + 200, 1, 20)
    r = map(frameCount, DURATION, DURATION + 200, 0, 180)
    g = map(frameCount, DURATION, DURATION + 200, 0, 120)
    b = map(frameCount, DURATION, DURATION + 200, 0, 120)
    stroke(color(r, g, b))
  } else if (frameCount <= DURATION + 205) {
    thickness = map(frameCount, DURATION + 200, DURATION + 205, 20, 40)
    r = map(frameCount, DURATION + 200, DURATION + 205, 180, 250)
    g = map(frameCount, DURATION + 200, DURATION + 205, 120, 150)
    b = map(frameCount, DURATION + 200, DURATION + 205, 120, 180)
    stroke(color(r, g, b))
  } else {
    strokeWeight(1)
    noFill()
    background('#4D7DC4')
    strokeWeight(5)
    stroke('white')
    drawCourtLines(titleWidth, titleHeight)
    drawBelated()
    drawClickInstruction()
    allBalls.run(frameCount)
    if (!haveBallsPopped) {
      popFrame = frameCount
      console.log('popFrame: ', popFrame)
      haveBallsPopped = true
    }
    if (
      frameCount > popFrame + popDelay &&
      frameCount < popFrame + popDelay + 1
    ) {
      console.log('second pop!')
      allBalls.balls.forEach((ball) => {
        ball.setVelocity(random(-10, 10), random(-30, -40))
      })
    }
  }

  push()
  noFill()
  translate(
    (width - titleWidth * titleScale) / 2,
    (height - titleHeight * titleScale) / 2
  )

  /**
   * get total duration from looping over textShapes in textObjects array
   * find multiplier to determine actual length for each shape animation
   */
  let percentageComplete = 0
  animS.shape(
    '01',
    DURATION * textShape1.durationPercentage,
    textShape1.scaledBezierVertices
  )
  percentageComplete += textShape1.durationPercentage

  for (let i = 1; i < textObjects.length; i++) {
    if (frameCount > DURATION * percentageComplete) {
      animS.shape(
        textObjects[i].text,
        DURATION * textObjects[i].durationPercentage,
        textObjects[i].scaledBezierVertices
      )
      percentageComplete += textObjects[i].durationPercentage
    }
  }
  pop()
}

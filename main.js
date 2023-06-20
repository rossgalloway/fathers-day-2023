const FRAME_RATE = 30
const DURATION = FRAME_RATE * 6
let haveBallsPopped = false
let popDelay = FRAME_RATE / 8
let popFrame
let titleScale = 1.5
// these next 3 variables are determined by the text
const titleWidth = 401
const titleHeight = 288
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

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(FRAME_RATE)

  for (shape of textObjects) {
    getVertexArrays(shape, titleScale, textStart_X, textStart_Y)
    pointsToAvoid.push(...shape.offsetVertices)
  }
  console.log(textObjects)

  // create new Flock object
  allBalls = new Balls()

  //Add boids into the system

  let ballDiameter = 25
  let dropPoints = windowWidth / ballDiameter
  for (let i = 1; i < dropPoints; i++) {
    const b = new Ball(
      (i * width) / dropPoints,
      height - 50,
      gravity,
      ballDiameter
    )
    allBalls.addBall(b)
  }

  // addBalls(textObjects, allBalls, 1, gravity)
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
    strokeWeight(2)
    stroke(40, 20, 20)
  }

  push()
  noFill()
  translate(
    (width - titleWidth * titleScale) / 2,
    (height - titleHeight * titleScale - AdditionalTitleSpacing) / 2
  )

  animS.shape('01', DURATION * 0.04, text_H_line1.scaledBezierVertices)
  if (frameCount > DURATION * 0.04) {
    animS.shape('02', DURATION * 0.08, text_H_line2.scaledBezierVertices)
  }
  if (frameCount > DURATION * 0.08) {
    animS.shape('03', DURATION * 0.3, text_appy.scaledBezierVertices)
  }
  if (frameCount > DURATION * 0.43) {
    animS.shape('04', DURATION * 0.04, text_B_line.scaledBezierVertices)
  }
  if (frameCount > DURATION * 0.47) {
    animS.shape('05', DURATION * 0.38, text_irthday.scaledBezierVertices)
  }
  if (frameCount > DURATION * 0.85) {
    animS.shape('07', DURATION * 0.04, text_crossedT.scaledBezierVertices)
  }
  if (frameCount > DURATION * 0.89) {
    animS.shape(
      '06',
      DURATION * 0.04,
      text_exclamation_line.scaledBezierVertices
    )
  }
  if (frameCount > DURATION * 0.93) {
    animS.shape(
      '09',
      DURATION * 0.04,
      text_heart_exclamation_point.scaledBezierVertices
    )
  }
  if (frameCount > DURATION * 0.97) {
    animS.shape('08', DURATION * 0.03, text_heart_on_I.scaledBezierVertices)
  }
  pop()
}

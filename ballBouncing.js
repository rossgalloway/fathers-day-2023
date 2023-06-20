/**
 * ballBouncing.js
 */

function Balls() {
  // An array for all the balls
  this.balls = [] // Initialize the array
}

Balls.prototype.run = function (frameCount) {
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].run(this.balls, frameCount, i) // Passing the entire list of balls to each balls individually
  }
}

Balls.prototype.addBall = function (b) {
  this.balls.push(b)
}

function Ball(x, y, gravity, diameter) {
  this.acceleration = createVector(0, 0)
  this.velocity = createVector(random(-10, 10), random(-30, -40))
  this.position = createVector(x, y)
  this.diameter = diameter
  this.m = this.diameter * 0.1
  //   this.maxspeed = 5 // Maximum speed
  this.gravity = createVector(0, gravity)
}

Ball.prototype.run = function (balls, frameCount, currentBall) {
  //   if (frameCount > 400) {
  //   }
  this.update()
  this.collisionDetection(balls, currentBall)
  this.calculatePosition()
  this.render()
  //   console.log(balls[7].position)
  //   this.update()
  //   this.borders()
}

Ball.prototype.update = function () {
  this.velocity.add(this.gravity)
  this.position.add(this.velocity)
}

Ball.prototype.calculatePosition = function () {
  //   this.velocity = this.velocity.add(this.gravity)
  //
  if (this.position.y + this.diameter / 2 > height) {
    this.velocity.y *= -0.85
    this.position.y = height - this.diameter / 2
  }
  if (this.position.x + this.diameter / 2 > width) {
    this.velocity.x *= -0.85
    this.position.x = width - this.diameter / 2
  }
  if (this.position.x - this.diameter / 2 < 0) {
    this.velocity.x *= -0.85
    this.position.x = 0 + this.diameter / 2
  }
  this.velocity = this.velocity.mult(0.999)
}

/**
 * location of ball (x,y)
 * location of all other balls in array
 * if location of ball is within range (1 diameter) then reverse vector
 * move ball slightly in that direction
 */
Ball.prototype.collisionDetection = function (balls, currentBall) {
  // For every ball in the system, check if it's too close
  for (let i = 0; i < balls.length; i++) {
    if (i !== currentBall) {
      let distanceVect = p5.Vector.sub(balls[i].position, this.position)
      //   let dvCopy = distanceVect.copy()
      //   let distNorm = dvCopy.normalize().mult(100)
      //   line(
      //     this.position.x,
      //     this.position.y,
      //     this.position.x + distNorm.x,
      //     this.position.y + distNorm.y
      //   )
      let distanceVectMag = distanceVect.mag()
      let r = this.diameter / 2
      let r_Other = balls[i].diameter / 2
      let minDistance = r + r_Other

      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (distanceVectMag < minDistance) {
        // console.log('collision detected: ', balls[i])
        let overlap = (minDistance - distanceVectMag) / 2
        let d = distanceVect.copy()
        let direction = d.normalize()
        // Move the balls away from each other by half of the overlap distance
        this.position.sub(p5.Vector.mult(direction, overlap))
        balls[i].position.add(p5.Vector.mult(direction, overlap))

        // calculate velocity in direction of collision
        let collisionSpeed1 = p5.Vector.dot(this.velocity, direction)
        let collisionSpeed2 = p5.Vector.dot(balls[i].velocity, direction)

        // swap velocities in collision direction
        let temp = collisionSpeed1
        collisionSpeed1 = collisionSpeed2
        collisionSpeed2 = temp

        // update velocities
        this.velocity.add(
          p5.Vector.mult(
            direction,
            collisionSpeed1 - p5.Vector.dot(this.velocity, direction)
          )
        )
        balls[i].velocity.add(
          p5.Vector.mult(
            direction,
            collisionSpeed2 - p5.Vector.dot(balls[i].velocity, direction)
          )
        )

        // add energy loss
        let energyLossFactor = 0.95
        this.velocity.mult(energyLossFactor)
        balls[i].velocity.mult(energyLossFactor)
      }
    }
  }
}

Ball.prototype.render = function () {
  // Draw a circle rotated in the direction of velocity
  //   let theta = this.velocity.heading() + radians(90)
  push()
  fill(199, 242, 97)
  stroke(135, 219, 86)
  strokeWeight(2)
  translate(this.position.x, this.position.y)
  //   rotate(theta)
  ellipse(0, 0, this.diameter, this.diameter)
  pop()
}

Ball.prototype.setVelocity = function (vx, vy) {
  this.velocity = createVector(vx, vy)
}

/**
 * Old collision code
 */

// // get angle of distanceVect
// let theta = distanceVect.heading()
// // precalculate trig values
// let sine = sin(theta)
// let cosine = cos(theta)

// /* bTemp will hold rotated ball this.positions. You
//          just need to worry about bTemp[1] this.position*/
// let bTemp = [new p5.Vector(), new p5.Vector()]

// /* this ball's this.position is relative to the other
//          so you can use the vector between them (bVect) as the
//          reference point in the rotation expressions.
//          bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
//          automatically to 0.0, which is what you want
//          since b[1] will rotate around b[0] */
// bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y
// bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x

// // rotate Temporary velocities
// let vTemp = [new p5.Vector(), new p5.Vector()]

// vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y
// vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x
// vTemp[1].x = cosine * balls[i].velocity.x + sine * balls[i].velocity.y
// vTemp[1].y = cosine * balls[i].velocity.y - sine * balls[i].velocity.x

// /* Now that velocities are rotated, you can use 1D
//          conservation of momentum equations to calculate
//          the final this.velocity along the x-axis. */
// let vFinal = [new p5.Vector(), new p5.Vector()]

// // final rotated this.velocity for b[0]
// vFinal[0].x =
//   ((this.m - balls[i].m) * vTemp[0].x + 2 * balls[i].m * vTemp[1].x) /
//   (this.m + balls[i].m)
// vFinal[0].y = vTemp[0].y

// // final rotated this.velocity for b[0]
// vFinal[1].x =
//   ((balls[i].m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
//   (this.m + balls[i].m)
// vFinal[1].y = vTemp[1].y

// // hack to avoid clumping
// bTemp[0].x += vFinal[0].x
// bTemp[1].x += vFinal[1].x

// /* Rotate ball this.positions and velocities back
//          Reverse signs in trig expressions to rotate
//          in the opposite direction */
// // rotate balls
// let bFinal = [new p5.Vector(), new p5.Vector()]

// bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y
// bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x
// bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y
// bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x

// // update balls to screen this.position
// balls[i].position.x = this.position.x + bFinal[1].x
// balls[i].position.y = this.position.y + bFinal[1].y

// this.position.add(bFinal[0])

// // update velocities
// this.velocity.x = (cosine * vFinal[0].x - sine * vFinal[0].y) * 0.75
// this.velocity.y = (cosine * vFinal[0].y + sine * vFinal[0].x) * 0.75
// balls[i].velocity.x = (cosine * vFinal[1].x - sine * vFinal[1].y) * 0.75
// balls[i].velocity.y = (cosine * vFinal[1].y + sine * vFinal[1].x) * 0.75

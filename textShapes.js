//assets/textShapes.js

// export interface TextShape {
//   text: string
//   shape: (p5: p5Types) => void
//   bezierVertices?
//   vertexPoints?
//   scaledBezierVertices?
//   scaledVertexPoints?
//   offsetVertices?
// }

const extractBezierVertices = (input_function) => {
  // convert the function to a string
  const function_str = input_function.toString()
  // create a list to hold the vertices
  const bezierVertices = []

  // find all the p5.vertex and p5.bezierVertex calls
  const matches = function_str.match(
    /(vertex|bezierVertex)\(([-?\d+.?\d*,\s?-?\d+.?\d*]+)\)/g
  )

  // loop through the matches
  for (let i = 0; i < (matches?.length ?? 0); i++) {
    const match = matches[i]
    // split the matched string on commas, convert the strings to floats, and add them to the list of vertices
    bezierVertices.push(
      match
        .replace(/(vertex|bezierVertex)\(/g, '')
        .replace(/\)/g, '')
        .split(',')
        .map((coord) => parseFloat(coord))
    )
  }
  return bezierVertices
}

const extractVertexPoints = (vertices) => {
  const VertexArray = []
  for (const arr of vertices) {
    if (arr.length == 2) {
      VertexArray.push(arr)
    } else if (arr.length > 2) {
      VertexArray.push(arr.slice(-2))
    }
  }
  return VertexArray
}

const scaleVertexArrays = (vertices, scale) => {
  const scaledVertices = []
  for (const arr of vertices) {
    scaledVertices.push(arr.map((coord) => coord * scale))
  }
  return scaledVertices
}

const offsetVertexArrays = (scaledArray, offsetX, offsetY) => {
  const offsetVertices = []
  for (const arr of scaledArray) {
    offsetVertices.push([arr[0] + offsetX, arr[1] + offsetY])
  }
  return offsetVertices
}

const getVertexArrays = (shapeObject, scale, offsetX, offsetY) => {
  shapeObject.bezierVertices = extractBezierVertices(shapeObject.shape)
  shapeObject.scaledBezierVertices = scaleVertexArrays(
    shapeObject.bezierVertices,
    scale
  )
  shapeObject.vertexPoints = extractVertexPoints(shapeObject.bezierVertices)
  shapeObject.scaledVertexPoints = scaleVertexArrays(
    shapeObject.vertexPoints,
    scale
  )
  shapeObject.offsetVertices = offsetVertexArrays(
    shapeObject.scaledVertexPoints,
    offsetX,
    offsetY
  )
}

let textObjects = []

const textShape1 = {
  text: 'Happy',
  duration: 5,
  shape: function () {
    stroke('blue')
    beginShape()
    vertex(29.6, 20.9)
    bezierVertex(
      29.900000000000002,
      18.4,
      30.900000000000002,
      14.899999999999999,
      31.200000000000003,
      14.999999999999998
    )
    bezierVertex(32.7, 15.199999999999998, 29.200000000000003, 35.9, 30.1, 62.8)
    bezierVertex(31, 85.2, 33, 94.3, 33.1, 95.5)
    bezierVertex(33.9, 101.9, 30.5, 70.9, 30.1, 63.3)
    bezierVertex(
      30,
      62.099999999999994,
      25.8,
      62.199999999999996,
      27.400000000000002,
      62.4
    )
    bezierVertex(44.6, 65.1, 59.8, 58.699999999999996, 86.7, 55.8)
    bezierVertex(87.10000000000001, 55.8, 78.8, 58.3, 78.9, 55.4)
    bezierVertex(
      79.10000000000001,
      45,
      78,
      12.399999999999999,
      78.80000000000001,
      14.299999999999997
    )
    bezierVertex(
      80.20000000000002,
      17.9,
      76.50000000000001,
      98.5,
      79.70000000000002,
      97.2
    )
    bezierVertex(
      80.90000000000002,
      96.7,
      82.50000000000001,
      93.2,
      84.50000000000001,
      88.3
    )
    bezierVertex(90.3, 73.9, 101, 53.1, 116, 50.1)
    bezierVertex(125.8, 48.1, 136.1, 48.6, 136, 49.4)
    bezierVertex(135.9, 50, 122.3, 47.699999999999996, 114.2, 50.3)
    bezierVertex(107.9, 52.4, 94.4, 64.39999999999999, 92.1, 76.3)
    bezierVertex(90.89999999999999, 82.3, 91.1, 91.8, 95.5, 93.8)
    bezierVertex(98.5, 95.2, 102.4, 92.8, 105.5, 90.5)
    bezierVertex(126.3, 75.5, 136.7, 47.3, 138.3, 47.9)
    bezierVertex(139, 48.199999999999996, 137.3, 53.5, 135.9, 59.3)
    bezierVertex(133, 71.5, 132.9, 94.19999999999999, 134, 94.19999999999999)
    bezierVertex(
      138.8,
      94.29999999999998,
      143.6,
      85.99999999999999,
      144,
      85.29999999999998
    )
    bezierVertex(
      147.7,
      79.69999999999999,
      163.3,
      41.499999999999986,
      174.5,
      44.59999999999998
    )
    bezierVertex(
      181,
      46.39999999999998,
      186.1,
      63.69999999999998,
      179.8,
      75.89999999999998
    )
    bezierVertex(
      165.3,
      103.89999999999998,
      145.5,
      92.79999999999998,
      145.5,
      92.79999999999998
    )
    bezierVertex(
      148.3,
      69.59999999999998,
      147.4,
      44.59999999999998,
      147.3,
      47.899999999999984
    )
    bezierVertex(
      146.8,
      66.99999999999999,
      142.10000000000002,
      132.1,
      141.5,
      136.49999999999997
    )
    bezierVertex(
      140.9,
      140.89999999999998,
      141.5,
      136.49999999999997,
      141.5,
      136.49999999999997
    )
    bezierVertex(
      141.5,
      136.49999999999997,
      144.7,
      92.59999999999997,
      146.5,
      93.89999999999998
    )
    bezierVertex(
      149.9,
      96.39999999999998,
      179.4,
      99.89999999999998,
      189.7,
      86.09999999999998
    )
    bezierVertex(
      198.29999999999998,
      74.59999999999998,
      205.89999999999998,
      41.89999999999998,
      220.89999999999998,
      43.69999999999998
    )
    bezierVertex(
      233.49999999999997,
      45.19999999999998,
      230.39999999999998,
      101.39999999999998,
      191.49999999999997,
      92.39999999999998
    )
    bezierVertex(
      186.89999999999998,
      91.29999999999998,
      193.49999999999997,
      40.09999999999998,
      193.29999999999998,
      46.299999999999976
    )
    bezierVertex(
      193.2,
      49.699999999999974,
      185.29999999999998,
      145.49999999999997,
      187.2,
      138.99999999999997
    )
    bezierVertex(
      188.1,
      135.79999999999998,
      189.2,
      90.69999999999997,
      190.7,
      91.39999999999998
    )
    bezierVertex(
      196,
      93.89999999999998,
      224.79999999999998,
      96.99999999999997,
      231.89999999999998,
      79.39999999999998
    )
    bezierVertex(
      237.7,
      64.89999999999998,
      236.89999999999998,
      39.699999999999974,
      236.7,
      46.99999999999998
    )
    bezierVertex(
      236.7,
      48.49999999999998,
      229.6,
      89.99999999999997,
      234.6,
      90.59999999999998
    )
    bezierVertex(
      245.79999999999998,
      91.89999999999998,
      264.3,
      32.99999999999998,
      262.2,
      41.89999999999998
    )
    bezierVertex(
      255.29999999999998,
      71.59999999999998,
      272.3,
      106.29999999999998,
      251,
      118.69999999999997
    )
    bezierVertex(
      245.5,
      121.89999999999998,
      235.9,
      125.39999999999998,
      211.6,
      114.79999999999997
    )
    endShape()
  }
}
textObjects.push(textShape1)

const textShape2 = {
  text: 'F',
  duration: 1,
  shape: function () {
    stroke('green')
    beginShape()
    vertex(282.3, 166.7)
    bezierVertex(
      264.40000000000003,
      171.79999999999998,
      247.4,
      173.6,
      223,
      175.7
    )
    bezierVertex(
      221.9,
      175.79999999999998,
      229.1,
      175.89999999999998,
      229,
      174.89999999999998
    )
    bezierVertex(
      229,
      174.49999999999997,
      228.9,
      173.49999999999997,
      228.9,
      173.09999999999997
    )
    bezierVertex(
      228,
      166.49999999999997,
      229.20000000000002,
      243.79999999999995,
      229.5,
      248.69999999999996
    )
    bezierVertex(
      229.8,
      253.49999999999997,
      229.1,
      192.19999999999996,
      228.7,
      192.09999999999997
    )
    bezierVertex(
      227.29999999999998,
      191.99999999999997,
      224.7,
      192.29999999999995,
      226,
      192.49999999999997
    )
    bezierVertex(
      232.9,
      193.29999999999998,
      256,
      190.99999999999997,
      277.4,
      185.99999999999997
    )
    endShape()
  }
}
textObjects.push(textShape2)

const textShape3 = {
  text: 'ather',
  duration: 5,
  shape: function () {
    stroke('blue')
    beginShape()
    vertex(289.8, 202.5)
    bezierVertex(
      286,
      201.6,
      278.90000000000003,
      200.5,
      270.90000000000003,
      202.9
    )
    bezierVertex(
      258.20000000000005,
      206.70000000000002,
      248.20000000000005,
      217.5,
      245.90000000000003,
      229.4
    )
    bezierVertex(
      244.70000000000005,
      235.4,
      244.90000000000003,
      244.9,
      249.30000000000004,
      246.9
    )
    bezierVertex(
      252.30000000000004,
      248.3,
      256.20000000000005,
      245.9,
      259.30000000000007,
      243.6
    )
    bezierVertex(
      280.1000000000001,
      228.6,
      290.50000000000006,
      200.39999999999998,
      292.1000000000001,
      201
    )
    bezierVertex(
      292.80000000000007,
      201.3,
      291.1000000000001,
      206.6,
      289.7000000000001,
      212.4
    )
    bezierVertex(
      286.8000000000001,
      224.6,
      286.7000000000001,
      247.3,
      287.8000000000001,
      247.3
    )
    bezierVertex(
      290.7000000000001,
      247.4,
      294.90000000000015,
      241.4,
      296.7000000000001,
      240.10000000000002
    )
    bezierVertex(
      313.9000000000001,
      227.60000000000002,
      312.7000000000001,
      187.60000000000002,
      312.8000000000001,
      187.60000000000002
    )
    bezierVertex(
      312.90000000000015,
      187.60000000000002,
      310.40000000000015,
      244.90000000000003,
      310.2000000000001,
      247.20000000000002
    )
    bezierVertex(
      309.6000000000001,
      253.8,
      314.0000000000001,
      203.8,
      312.1000000000001,
      204.10000000000002
    )
    bezierVertex(
      307.2000000000001,
      205.00000000000003,
      296.30000000000007,
      205.60000000000002,
      299.9000000000001,
      205.70000000000002
    )
    bezierVertex(
      301.2000000000001,
      205.70000000000002,
      327.7000000000001,
      203.3,
      328.1000000000001,
      198.20000000000002
    )
    bezierVertex(
      329.1000000000001,
      184.10000000000002,
      328.9000000000001,
      168.8,
      329.4000000000001,
      169.70000000000002
    )
    bezierVertex(
      331.4000000000001,
      173.9,
      326.1000000000001,
      248.10000000000002,
      323.9000000000001,
      246.70000000000002
    )
    bezierVertex(
      323.1000000000001,
      246.20000000000002,
      326.2000000000001,
      231.3,
      336.2000000000001,
      213.20000000000002
    )
    bezierVertex(
      338.5000000000001,
      209.10000000000002,
      347.0000000000001,
      193.70000000000002,
      351.4000000000001,
      195.10000000000002
    )
    bezierVertex(
      359.1000000000001,
      197.40000000000003,
      350.7000000000001,
      248.8,
      351.80000000000007,
      249.00000000000003
    )
    bezierVertex(
      352.30000000000007,
      249.10000000000002,
      351.50000000000006,
      228.60000000000002,
      363.1000000000001,
      221.70000000000002
    )
    bezierVertex(
      383.7000000000001,
      209.4,
      403.00000000000006,
      209.3,
      402.00000000000006,
      207.4
    )
    bezierVertex(
      400.1000000000001,
      204,
      391.70000000000005,
      196.20000000000002,
      383.1000000000001,
      199.8
    )
    bezierVertex(
      368.1000000000001,
      206,
      341.30000000000007,
      261.7,
      387.2000000000001,
      241
    )
    bezierVertex(
      408.4000000000001,
      231.5,
      415.2000000000001,
      193.9,
      412.5000000000001,
      195.5
    )
    bezierVertex(
      410.60000000000014,
      196.6,
      409.60000000000014,
      249.6,
      409.2000000000001,
      243.7
    )
    bezierVertex(
      408.9000000000001,
      240.29999999999998,
      421.0000000000001,
      191.5,
      434.9000000000001,
      193
    )
    bezierVertex(
      437.80000000000007,
      193.3,
      439.4000000000001,
      198.9,
      440.4000000000001,
      203.8
    )
    endShape()
  }
}
textObjects.push(textShape3)

const textShape4 = {
  text: 'apostrophe',
  duration: 1,
  shape: function () {
    stroke('purple')
    beginShape()
    vertex(437.2, 159.5)
    bezierVertex(
      438.09999999999997,
      160.8,
      439.8,
      163.9,
      440.09999999999997,
      168.2
    )
    bezierVertex(
      440.29999999999995,
      172.2,
      439.09999999999997,
      175.29999999999998,
      438.4,
      176.79999999999998
    )
    endShape()
  }
}
textObjects.push(textShape4)

const textShape5 = {
  text: 's',
  duration: 1,
  shape: function () {
    stroke('yellow')
    beginShape()
    vertex(476.9, 200.4)
    bezierVertex(
      473.29999999999995,
      194.3,
      471.59999999999997,
      192.20000000000002,
      470.79999999999995,
      192.5
    )
    bezierVertex(464.9, 194.7, 450.4, 209.2, 452.9, 211)
    bezierVertex(463.59999999999997, 218.8, 481.9, 224.1, 480.4, 234.1)
    bezierVertex(
      479.29999999999995,
      241.4,
      460.79999999999995,
      246.29999999999998,
      451.79999999999995,
      239.6
    )
    bezierVertex(
      446.69999999999993,
      235.79999999999998,
      448.69999999999993,
      227.29999999999998,
      449.09999999999997,
      225.5
    )
    endShape()
  }
}
textObjects.push(textShape5)

const textShape6 = {
  text: 'D',
  duration: 1,
  shape: function () {
    stroke('orange')
    beginShape()
    vertex(480.4, 294.4)
    bezierVertex(501, 285.7, 548.6999999999999, 285.2, 563, 324.2)
    bezierVertex(571.7, 347.8, 555.7, 363.9, 532.9, 369.8)
    bezierVertex(503.2, 377.5, 494.9, 366.2, 488.2, 362.8)
    bezierVertex(486, 361.7, 494.9, 368.3, 491.8, 367.90000000000003)
    bezierVertex(
      489.3,
      367.6,
      493.1,
      344.00000000000006,
      490,
      292.80000000000007
    )
    endShape()
  }
}
textObjects.push(textShape6)

const textShape7 = {
  text: 'ay',
  duration: 2,
  shape: function () {
    stroke('red')
    beginShape()
    // Start from the last point of the original shape
    vertex(615.3, 323)
    // Reverse the order of bezierVertex calls and swap the order of control points
    bezierVertex(611.6, 322.09999999999997, 604.5, 321, 596.4, 323.4)
    bezierVertex(
      583.6999999999999,
      327.09999999999997,
      573.6999999999999,
      338,
      571.4,
      349.9
    )
    bezierVertex(570.1999999999999, 355.9, 570.4, 365.4, 574.8, 367.4)
    bezierVertex(
      577.8,
      368.7,
      581.6999999999999,
      366.29999999999995,
      584.8,
      364.09999999999997
    )
    bezierVertex(
      605.5999999999999,
      349.09999999999997,
      616.0999999999999,
      320.8999999999999,
      617.5999999999999,
      321.49999999999994
    )
    bezierVertex(
      618.3,
      321.69999999999993,
      616.5999999999999,
      327.0999999999999,
      615.1999999999999,
      332.8999999999999
    )
    bezierVertex(
      612.1999999999999,
      345.0999999999999,
      612.0999999999999,
      366.8999999999999,
      613.3,
      367.7999999999999
    )
    bezierVertex(
      614.9,
      368.99999999999994,
      622.4,
      356.19999999999993,
      623.8,
      347.8999999999999
    )
    bezierVertex(
      624.8,
      341.99999999999994,
      627.7,
      315.19999999999993,
      627.5,
      322.49999999999994
    )
    bezierVertex(
      627.4,
      323.99999999999994,
      620.4,
      365.49999999999994,
      625.4,
      366.09999999999997
    )
    bezierVertex(636.6, 367.29999999999995, 655.1, 308.4, 653, 317.4)
    bezierVertex(
      646.0999999999999,
      347.09999999999997,
      663.1999999999999,
      381.8,
      641.8,
      394.2
    )
    bezierVertex(626.4, 403.2, 608.4, 400.2, 602.4, 390.3)
    endShape()
  }
}
textObjects.push(textShape7)

const textShape8 = {
  text: 'exclamation line',
  duration: 1,
  shape: function () {
    stroke('magenta')
    beginShape()
    vertex(669.2, 293.2)
    bezierVertex(667.7, 304.4, 666.5, 316.7, 666.1, 330)
    bezierVertex(665.7, 340.5, 665.8000000000001, 350.3, 666.2, 359.6)
    endShape()
  }
}
textObjects.push(textShape8)

const textShape9 = {
  text: 'exclamation point',
  duration: 1,
  shape: function () {
    stroke('black')
    beginShape()
    vertex(667.9, 366.9)
    bezierVertex(667.6, 366.2, 666.9, 365.2, 666.1999999999999, 365.2)
    bezierVertex(
      664.9999999999999,
      365.3,
      663.6999999999999,
      368.2,
      664.6999999999999,
      369.3
    )
    bezierVertex(665.4, 370.1, 667.3, 370, 667.9999999999999, 369)
    bezierVertex(668.4, 368.2, 668, 367.2, 667.9, 366.9)
    endShape()
  }
}
textObjects.push(textShape9)

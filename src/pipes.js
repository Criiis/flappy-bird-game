const spawnPipe = (PIPE_MIN, PIPE_OPEN, SPEED) => {
  const openSpace = PIPE_OPEN();
  console.log("🚀 ~ file: pipes.js:3 ~ spawnPipe ~ openSpace:", openSpace);
  // calculate pipe positions
  const h1 = rand(PIPE_MIN, height() - PIPE_MIN - openSpace);
  console.log("🚀 ~ file: pipes.js:5 ~ spawnPipe ~ h1:", h1);
  const h2 = height() - h1 - openSpace;
  console.log("🚀 ~ file: pipes.js:7 ~ spawnPipe ~ h2:", h2);

  add([
    pos(width(), 0),
    rect(64, h1),
    color(0, 127, 255),
    outline(4),
    area(),
    move(LEFT, SPEED),
    offscreen({ destroy: true }),
    // give it tags to easier define behaviors see below
    "pipe",
  ]);

  add([
    pos(width(), h1 + openSpace),
    rect(64, h2),
    color(0, 127, 255),
    outline(4),
    area(),
    move(LEFT, SPEED),
    offscreen({ destroy: true }),
    // give it tags to easier define behaviors see below
    "pipe",
    // raw obj just assigns every field to the game obj
    { passed: false },
  ]);
};

export default spawnPipe;

import kaboom from "kaboom";
import spawnPipe from "./pipes";

const k = kaboom();

// make background black in kaboom.js
setBackground(Color.fromHex("#000000"));

loadSprite("champion", "./sprites/champion_move.png", {
  x: 0,
  y: 0,
  width: 256,
  height: 192,
  sliceX: 4, // Number of frames per animation
  sliceY: 3, // Number of directions (up, down, left, right)
  anims: {
    walkSide: { from: 0, to: 3, loop: true },
    walkUp: { from: 4, to: 7, loop: true },
    walkDown: { from: 8, to: 11, loop: true },

    idleSide: { from: 3, to: 3 },
    idleUp: { from: 6, to: 6 },
    idleDown: { from: 10, to: 10 },
  },
});

// define gravity
setGravity(3200);
let maxScore = 0;

scene("game", () => {
  const PIPE_OPEN = () => rand(175, 300);
  const PIPE_MIN = 60;
  const JUMP_FORCE = 800;
  const SPEED = 320; //320 default
  const CEILING = -10;
  let score = 0;

  const scoreLabel = add([
    text(`CURRENT: ${score}`),
    anchor("center"),
    pos(width() - 160, 40),
    fixed(),
    z(100),
  ]);
  add([text(`MAX: ${maxScore}`), pos(width() - 260, 80), fixed(), z(100)]);

  // add sprite
  const player = add([sprite("champion"), pos(100, height() / 3), area(), body()]);

  player.onUpdate(() => {
    // collision with screen and if it hit screen switch to "lose" scene
    if (player.pos.y >= height() || player.pos.y <= CEILING) {
      go("lose", score);
    }
  });

  // jump
  onKeyPress("space", () => player.jump(JUMP_FORCE));
  onClick(() => player.jump(JUMP_FORCE));

  // spawn a pipe every 1 second
  loop(2, () => spawnPipe(PIPE_MIN, PIPE_OPEN, SPEED));

  // per frame event for all objects with tag 'pipe'
  onUpdate("pipe", (p) => {
    // check if bean passed the pipe
    if (p.pos.x + p.width <= player.pos.x && p.passed === false) {
      score++;
      scoreLabel.text = `CURRENT: ${score}`;
      p.passed = true;
    }
  });

  // callback when bean onCollide with objects with tag "pipe"
  player.onCollide("pipe", () => go("lose", score));
});

scene("lose", (score) => {
  if (score > maxScore) {
    maxScore = score;
  }
  add([text("GAME OVER"), pos(width() / 2, height() / 2 - 100), scale(2), anchor("center")]);
  add([text(score), pos(width() / 2, height() / 2), scale(3), anchor("center")]);
  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});

go("game");

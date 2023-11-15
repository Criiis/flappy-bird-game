const movement = (player, speed) => {
  onKeyDown("a", () => player.move(-speed, 0));
  onKeyDown("d", () => player.move(speed, 0));
  onKeyDown("w", () => player.move(0, -speed));
  onKeyDown("s", () => player.move(0, speed));

  // release
  onKeyRelease("a", () => player.play("idleSide"));
  onKeyRelease("d", () => player.play("idleSide"));
  onKeyRelease("w", () => player.play("idleUp"));
  onKeyRelease("s", () => player.play("idleDown"));
};

export default movement;




// const SPEED = 250;
// const player = add([sprite("champion"), pos(width() * 0.5, height() * 0.5)]);
// player.play("idleDown");
// movement(player, SPEED);

// onUpdate(() => {
//   if (isKeyPressed("w")) {
//     player.play("walkUp");
//   } else if (isKeyPressed("s")) {
//     player.play("walkDown");
//   } else if (isKeyPressed("a")) {
//     player.play("walkSide");
//     player.flipX = true;
//   } else if (isKeyPressed("d")) {
//     player.play("walkSide");
//     player.flipX = false;
//   }
// });
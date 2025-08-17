import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
/* Jacobus Burger (2025-08-16)
 * B1T Jam (2025-08-10 to 2025-08-17)
 * I would have liked to have started sooner but I ended up being more
 *  preoccupied than I would have liked. Still, Kaplay is a nice framework
 *  overall, one I may use again soon. The game jam was great overall, lots of
 *  impressive work by everyone involved.
 */

kaplay({
  background: "#313131",
});



// resources
loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("player", "sprites/player.png");
loadSprite("ladder", "sprites/ladder.png");
loadSprite("wall", "sprites/wall.png");


// player
let player = null;
onAdd("player", (object) => {
  if (!player) {
    player = object;
  }
});


// levels
addLevel([
  "#                    #",
  "#                    #",
  "#                    #",
  "#    ############^   #",
  "#      ^         ^   #",
  "#      ^         ^   #",
  "#      ^         ^   #",
  "#  ####^         ^   #",
  "#      ^ ^########   #",
  "#      ^ ^ ^         #",
  "#      ^ ^ ^         #",
  "#      ^ ^ ^         #",
  "#    ### # #  #### #^#",
  "#                   ^#",
  "#                  #^#",
  "#       ^########## ^#",
  "#       ^           ^#",
  "#       ^        ^##^#",
  "# @     ^        ^   #",
  "######################",
], {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "#": () => [
        sprite("wall"),
        area(),
        body({isStatic: true}),
        "wall",
      ],
      "^": () => [
        sprite("ladder"),
        area(),
        z(-1),
        "ladder",
      ],
      "@": () => [
        sprite("player"),
        area(),
        body(),
        state( "idle", ["idle", "climb"]),
        "player",
      ],
    },
})


// camera
camScale(4);
player.onUpdate(() => {
  camPos(player.pos);
});


// physics
setGravity(2000);


// movement
const SPEED = 200;
const JUMP_TIMEOUT = 0.8; // delay between jumps
let can_jump = true;

onKeyDown(["space", "up", "w"], () => {
  if (!player) {
    return;
  }
  // climb when on elevator plant
  if (player.state == "climb") {
    player.move(0, -SPEED);
  }
  // jump when on ground with a brief pause between
  if (player.state == "idle" && player.isGrounded() && can_jump) {
    player.jump();
    // wait a bit before jumping again
    can_jump = false;
    wait(JUMP_TIMEOUT, () => { can_jump = true; });
  }
});

onKeyDown(["down", "s"], () => {
  player.move(0, SPEED);
});

onKeyDown(["left", "a"], () => {
  player.move(-SPEED, 0);
});

onKeyDown(["right", "d"], () => {
  player.move(SPEED, 0);
});


// state transitions
player.onStateEnter("climb", () => {
  player.gravityScale = 0;
  player.vel = new Vec2(0, 0);
});

player.onStateEnter("idle", () => {
  player.gravityScale = 1;
});


// interactions
player.onCollideUpdate("ladder", () => {
  player.enterState("climb");
});

player.onCollideEnd("ladder", () => {
  player.enterState("idle");
});

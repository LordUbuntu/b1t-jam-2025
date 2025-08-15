import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

kaplay();


// resources
loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("player", "sprites/bean.png");
loadSprite("bridge", "sprites/bridge_tmp.png");
loadSprite("elevator", "sprites/elevator_tmp.png");
loadSprite("ground", "sprites/ground_tmp.png");

let player = null;


// levels
addLevel([
  "##########",
  "#        #",
  "#        #",
  "#    #####",
  "#  @^    #",
  "#  ###   #",
  "#     ^  #",
  "#     ## #",
  "#    ^   #",
  "##########",
], {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "#": () => [
        sprite("ground"),
        area(),
        body({isStatic: true}),
        "ground",
      ],
      "^": () => [
        sprite("elevator"),
        body({isStatic: true}),
        "elevator",
      ],
      "@": () => {
        const player_components = [
          sprite("player"),
          area(),
          body(),
          "player",
        ];
        onAdd("player", (object) => {
          if (!player) player = object;
        });
        return player_components;
      },
    },
})



// movement
setGravity(2000);

onKeyDown("space", () => {
  if (player && player.isGrounded())
    player.jump();
});
onKeyDown("up", () => {
  if (player && player.isGrounded())
    player.jump();
});
onKeyDown("w", () => {
  if (player && player.isGrounded())
    player.jump();
});

onKeyDown("a", () => {
  player.move(-200, 0);
});
onKeyDown("left", () => {
  player.move(-200, 0);
});

onKeyDown("d", () => {
  player.move(200, 0);
});
onKeyDown("right", () => {
  player.move(200, 0);
});

onKeyDown("e", () => {
  // water
});

onKeyDown("r", () => {
  // prune
});

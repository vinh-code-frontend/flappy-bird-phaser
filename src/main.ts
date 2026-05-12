import Phaser from "phaser";
import { createFpsText, updateFpsText } from "./store";
// let totalDelta = 0;

const { log } = console;

let bird: Phaser.Physics.Arcade.Sprite | null;

const DEFAULT_VELOCITY = 200

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",

    arcade: {
      // gravity: { y: 200 },
      debug: true,

    },
  },
  scene: { preload, create, update, },
};

function preload(this: Phaser.Scene) {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

function create(this: Phaser.Scene) {
  createFpsText(this);

  this.add.image(0, 0, "sky").setOrigin(0, 0);

  const { cx, cy } = getCenter();
  bird = this.physics.add.sprite(cx, cy, "bird");
  bird.setVelocityX(DEFAULT_VELOCITY);
  // bird.setGravity(0, 200);
  console.log(bird.body);
}

function update(this: Phaser.Scene, time: number, delta: number) {
  updateFpsText(this);
  const body = bird?.body as Phaser.Physics.Arcade.Body;

  if (body.right >= (config.width as number)) {
    bird?.setVelocityX(-DEFAULT_VELOCITY);
  } else if (body.left <= 0) {
    bird?.setVelocityX(DEFAULT_VELOCITY);
  }
  // totalDelta += delta;
  // log(totalDelta);
}

const getCenter = () => {
  return {
    cx: typeof config.width === "number" ? config.width / 2 : 0,
    cy: typeof config.height === "number" ? config.height / 2 : 0,
  };
};

new Phaser.Game(config);

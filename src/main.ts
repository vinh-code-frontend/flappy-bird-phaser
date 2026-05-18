import Phaser from "phaser";
import { createFpsText, updateFpsText } from "./store";
// let totalDelta = 0;

const { log } = console;


const DEFAULT_VELOCITY = 200
const DEFAULT_GRAVITY = 200

let flapVelocity = 150
let bird: Phaser.Physics.Arcade.Sprite | null;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",

    arcade: {
      gravity: { y: 400 },
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

  console.log(bird.body);

  this.input.on('pointerdown', flap)

  this.input.keyboard.on('keydown-SPACE ', flap)
}

function update(this: Phaser.Scene, time: number, delta: number) {
  updateFpsText(this);
  const body = bird?.body as Phaser.Physics.Arcade.Body;
  console.log({ y: body.velocity.y })
  const y = body.y

  if (y <= 0 || y >= 600) {
    const { cx, cy } = getCenter();
    bird?.setPosition(cx, cy)
    bird?.setVelocityY(0)
    // alert('oh shit')
  }

  // if (body.right >= (config.width as number)) {
  //   bird?.setVelocityX(-DEFAULT_VELOCITY);
  // } else if (body.left <= 0) {
  //   bird?.setVelocityX(DEFAULT_VELOCITY);
  // }
  // totalDelta += delta;
  // log(totalDelta);
}

function flap() {
  bird?.setVelocityY(-flapVelocity)
}
const getCenter = () => {
  return {
    cx: typeof config.width === "number" ? config.width / 2 : 0,
    cy: typeof config.height === "number" ? config.height / 2 : 0,
  };
};

new Phaser.Game(config);

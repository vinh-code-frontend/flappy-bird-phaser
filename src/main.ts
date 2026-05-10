import Phaser from "phaser";

let fpsText: Phaser.GameObjects.Text;
let bird: Phaser.Physics.Arcade.Sprite;
let totalDelta = 0;

const { log } = console;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload(this: Phaser.Scene) {
      this.load.image("sky", "assets/sky.png");
      this.load.image("bird", "assets/bird.png");
    },
    create(this: Phaser.Scene) {
      fpsText = this.add
        .text(10, 10, "", {
          fontSize: "16px",
          color: "#00ff00",
          fontFamily: "Segoe UI",
        })
        .setDepth(999);

      this.add.image(0, 0, "sky").setOrigin(0, 0);
      const { cx, cy } = getCenter();
      bird = this.physics.add.sprite(cx, cy, "bird");
      bird.setVelocityY(100);
      bird.setGravity(0, 200);
      console.log(bird.body);
    },
    update(this: Phaser.Scene, time: number, delta: number) {
      fpsText.setText(`FPS: ${Math.floor(this.game.loop.actualFps)}`);

      totalDelta += delta;
      log(totalDelta);
    },
  },
};

const getCenter = () => {
  return {
    cx: typeof config.width === "number" ? config.width / 2 : 0,
    cy: typeof config.height === "number" ? config.height / 2 : 0,
  };
};

new Phaser.Game(config);

import Phaser from "phaser";
import { LANES, PLAYER_Y } from "../config";

export class Player extends Phaser.Physics.Arcade.Sprite {
  lane = 1;
  private jumping = false;

  constructor(scene: Phaser.Scene) {
    super(scene, LANES[1], PLAYER_Y, "player-idle");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(10).setScale(0.78);
    this.setCircle(30, 20, 27);
    this.setCollideWorldBounds(true);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.play("banana-run");
  }

  move(direction: -1 | 1) {
    const nextLane = Phaser.Math.Clamp(this.lane + direction, 0, LANES.length - 1);
    if (nextLane === this.lane) return;
    this.lane = nextLane;
    this.scene.events.emit("player:lane-change");
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({ targets: this, x: LANES[this.lane], duration: 135, ease: "Sine.Out" });
  }

  jump() {
    if (this.jumping) return;
    this.jumping = true;
    this.scene.events.emit("player:jump");
    this.anims.stop();
    this.setTexture("player-jump");
    this.scene.tweens.add({
      targets: this,
      y: PLAYER_Y - 122,
      duration: 210,
      ease: "Sine.Out",
      yoyo: true,
      onComplete: () => { this.y = PLAYER_Y; this.jumping = false; this.play("banana-run"); this.scene.events.emit("player:land"); },
    });
  }

  update() {
    this.setRotation(this.jumping ? -0.1 : 0);
  }
}

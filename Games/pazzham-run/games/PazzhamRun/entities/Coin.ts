import Phaser from "phaser";

export class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "item-coin");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8).setScale(0.52);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    this.setCircle(25, 16, 20);
  }
}

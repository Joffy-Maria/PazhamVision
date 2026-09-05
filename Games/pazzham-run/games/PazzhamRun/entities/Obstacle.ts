import Phaser from "phaser";

export type ObstacleType = "rock" | "pillar" | "coconut" | "snake" | "log";

export class Obstacle extends Phaser.Physics.Arcade.Sprite {
  typeName: ObstacleType;
  constructor(scene: Phaser.Scene, x: number, typeName: ObstacleType) {
    super(scene, x, -70, `obstacle-${typeName}`);
    this.typeName = typeName;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(7);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    if (typeName === "pillar") this.setSize(46, 118).setOffset(29, 22);
    else if (typeName === "log") this.setSize(125, 48).setOffset(35, 48);
    else this.setCircle(34, 25, 30);
  }
}

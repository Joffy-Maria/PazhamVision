import Phaser from "phaser";
import { AUDIO_CONFIG, SFX_CONFIG } from "../audioConfig";
import { GAME_HEIGHT, GAME_WIDTH, LANES, RUN_THRESHOLD, type RunResult } from "../config";
import { Coin } from "../entities/Coin";
import { Obstacle, type ObstacleType } from "../entities/Obstacle";
import { Player } from "../entities/Player";

export class GameScene extends Phaser.Scene {
  private player!: Player; private obstacles!: Phaser.Physics.Arcade.Group;
  private coins!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private scoreText!: Phaser.GameObjects.Text; private floor!: Phaser.GameObjects.TileSprite;
  private floorLines: Phaser.GameObjects.Line[] = []; private distance = 0; private coinsCollected = 0; private speed = 205; private spawnIn = 900; private coinSpawnIn = 1450; private gameOver = false;
  private coinText!: Phaser.GameObjects.Text;
  private backgroundMusic?: Phaser.Sound.BaseSound;
  private deathSound?: Phaser.Sound.BaseSound;
  private sfx: Partial<Record<keyof typeof SFX_CONFIG, Phaser.Sound.BaseSound>> = {};
  constructor(private readonly onRunComplete?: (result: RunResult) => void) { super("GameScene"); }

  preload() {
    const load = (key: string, path: string) => this.load.image(key, `assets/pazzham/${path}`);
    load("player-idle", "player/idle.png"); load("player-run1", "player/run1.png"); load("player-run2", "player/run2.png"); load("player-run3", "player/run3.png"); load("player-jump", "player/jump.png");
    load("obstacle-rock", "obstacles/rock.png"); load("obstacle-pillar", "obstacles/pillar.png"); load("obstacle-coconut", "obstacles/coconut.png"); load("obstacle-snake", "obstacles/snake.png"); load("obstacle-log", "obstacles/log.png");
    load("env-background", "environment/background.png"); load("env-floor", "environment/floor.png"); load("env-wall", "environment/wall.png"); load("env-torch", "environment/torch.png"); load("env-palm", "environment/palm.png"); load("env-temple", "environment/temple.png");
    load("ui-title", "ui/title.png"); load("ui-distance", "ui/distance.png");
    load("item-coin", "items/coin.png");
    this.load.audio(AUDIO_CONFIG.background.key, AUDIO_CONFIG.background.path);
    this.load.audio(AUDIO_CONFIG.death.key, AUDIO_CONFIG.death.path);
    Object.values(SFX_CONFIG).forEach((effect) => this.load.audio(effect.key, effect.path));
  }

  create() {
    this.resetRunState();
    this.createAnimations(); this.drawWorld(); this.player = new Player(this);
    this.createAudio();
    this.obstacles = this.physics.add.group({ classType: Obstacle, runChildUpdate: false });
    this.coins = this.physics.add.group({ classType: Coin, runChildUpdate: false });
    this.cursors = this.input.keyboard!.createCursorKeys(); this.keys = this.input.keyboard!.addKeys("A,D,SPACE") as Record<string, Phaser.Input.Keyboard.Key>;
    this.add.image(150, 55, "ui-title").setDisplaySize(260, 83).setDepth(30);
    this.add.image(GAME_WIDTH - 130, 53, "ui-distance").setDisplaySize(235, 92).setDepth(30);
    this.scoreText = this.add.text(GAME_WIDTH - 56, 47, "0000m", { fontFamily: "Arial Black, sans-serif", fontSize: "23px", color: "#fff6bd", stroke: "#382212", strokeThickness: 5 }).setOrigin(1, 0.5).setDepth(31);
    this.add.image(47, 111, "item-coin").setScale(0.38).setDepth(30);
    this.coinText = this.add.text(76, 111, "000", { fontFamily: "Arial Black, sans-serif", fontSize: "20px", color: "#fff6bd", stroke: "#382212", strokeThickness: 5 }).setOrigin(0, 0.5).setDepth(31);
    this.physics.add.overlap(this.player, this.obstacles, this.endGame, undefined, this);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);
    this.events.on("player:jump", this.playJump, this);
    this.events.on("player:land", this.playLand, this);
    this.events.on("player:lane-change", this.playWhoosh, this);
    this.events.on("item:coin", this.playCoin, this);
    this.events.on("item:powerup", this.playPowerup, this);
    this.events.on("powerup:active", this.playPowerupActive, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroyAudio, this);
  }

  update(_: number, delta: number) {
    if (this.gameOver) return;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.keys.A)) this.player.move(-1);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.keys.D)) this.player.move(1);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) this.player.jump();
    this.player.update(); this.distance += delta * 0.012; this.speed = Math.min(390, 205 + this.distance * 0.15);
    this.scoreText.setText(`${Math.floor(this.distance).toString().padStart(4, "0")}m`); this.spawnIn -= delta;
    if (this.spawnIn <= 0) this.spawnObstacle();
    this.coinSpawnIn -= delta;
    if (this.coinSpawnIn <= 0) this.spawnCoinPattern();
    for (const child of this.obstacles.getChildren()) { const obstacle = child as Obstacle; obstacle.y += this.speed * delta / 1000; obstacle.setScale(Phaser.Math.Clamp(0.42 + obstacle.y / GAME_HEIGHT * 0.62, 0.42, 1.04)); if (obstacle.y > GAME_HEIGHT + 110) obstacle.destroy(); }
    for (const child of this.coins.getChildren()) { const coin = child as Coin; coin.y += this.speed * delta / 1000; coin.setAngle(coin.angle + delta * 0.11); if (coin.y > GAME_HEIGHT + 80) coin.destroy(); }
    this.floor.tilePositionY -= this.speed * delta / 1100;
    this.floorLines.forEach((line) => { line.y += this.speed * delta / 1000; if (line.y > GAME_HEIGHT) line.y -= 390; });
  }

  private spawnObstacle() { const types: ObstacleType[] = ["rock", "pillar", "coconut", "snake", "log"]; this.obstacles.add(new Obstacle(this, LANES[Phaser.Math.Between(0, 2)], Phaser.Utils.Array.GetRandom(types))); this.spawnIn = Phaser.Math.Clamp(1050 - this.distance * 1.3, 520, 1050); }
  private spawnCoinPattern() {
    const startLane = Phaser.Math.Between(0, 2);
    const patterns = [
      [{ lane: startLane, y: -70 }],
      [{ lane: startLane, y: -70 }, { lane: startLane, y: -145 }, { lane: startLane, y: -220 }],
      [{ lane: 0, y: -80 }, { lane: 1, y: -145 }, { lane: 2, y: -210 }],
      [{ lane: 0, y: -80 }, { lane: 1, y: -80 }, { lane: 2, y: -80 }],
    ];
    Phaser.Utils.Array.GetRandom(patterns).forEach(({ lane, y }) => {
      if (this.isCoinPositionClear(LANES[lane], y)) this.coins.add(new Coin(this, LANES[lane], y));
    });
    this.coinSpawnIn = Phaser.Math.Between(1350, 2250);
  }
  private isCoinPositionClear(x: number, y: number) {
    return !this.obstacles.getChildren().some((child) => {
      const obstacle = child as Obstacle;
      return Math.abs(obstacle.x - x) < 55 && Math.abs(obstacle.y - y) < 125;
    });
  }
  private collectCoin(_: unknown, coinObject: unknown) {
    const coin = coinObject as Coin;
    if (!coin.active) return;
    coin.disableBody(true, false);
    this.coinsCollected += 1;
    this.coinText.setText(this.coinsCollected.toString().padStart(3, "0"));
    this.events.emit("item:coin");
    this.tweens.add({ targets: coin, y: coin.y - 30, scale: coin.scale * 1.35, alpha: 0, duration: 180, ease: "Sine.Out", onComplete: () => coin.destroy() });
  }
  private endGame() {
    if (this.gameOver) return; this.gameOver = true; this.physics.pause(); this.cameras.main.shake(210, 0.014); this.player.setTint(0xff8264);
    this.backgroundMusic?.stop();
    this.playSfx("hit");
    const distance = Math.floor(this.distance);
    this.onRunComplete?.({ score: distance, distance, coins: this.coinsCollected, passedThreshold: distance >= RUN_THRESHOLD });
    const showGameOver = () => this.showGameOver();
    if (this.deathSound?.play()) this.deathSound.once("complete", showGameOver);
    else showGameOver();
  }
  private showGameOver() {
    const distance = Math.floor(this.distance);
    const passedThreshold = distance >= RUN_THRESHOLD;
    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2).setDepth(40).setAlpha(0).setScale(0.92);
    const textStyle = { fontFamily: "Arial Black, sans-serif", stroke: "#382212", strokeThickness: 5 };
    const labelStyle = { ...textStyle, fontSize: "15px", color: "#fff1a4", letterSpacing: 2 };

    panel.add([
      this.add.rectangle(0, 0, 390, 392, 0x211914, 0.96).setStrokeStyle(6, 0xf0bd3a),
      this.add.rectangle(0, 0, 366, 368, 0x513722, 0.72).setStrokeStyle(2, 0xffe279),
      this.add.text(0, -151, "GAME OVER", { ...textStyle, fontSize: "34px", color: "#fff6bd" }).setOrigin(0.5),
      this.add.text(0, -94, "DISTANCE", labelStyle).setOrigin(0.5),
      this.add.text(0, -62, `${distance}m`, { ...textStyle, fontSize: "27px", color: "#ffffff" }).setOrigin(0.5),
      this.add.text(0, -13, "COINS", labelStyle).setOrigin(0.5),
      this.add.text(0, 19, this.coinsCollected.toString(), { ...textStyle, fontSize: "27px", color: "#ffd83d" }).setOrigin(0.5),
      this.add.text(0, 61, passedThreshold ? "PASSED!" : "TRY AGAIN", { ...textStyle, fontSize: "13px", color: passedThreshold ? "#a9ee77" : "#f2b26a" }).setOrigin(0.5),
    ]);
    const restartButton = this.add.rectangle(0, 119, 194, 48, 0xf0bd3a).setStrokeStyle(4, 0x7e4a20).setInteractive({ useHandCursor: true });
    const restartText = this.add.text(0, 119, "RESTART", { ...textStyle, fontSize: "19px", color: "#382212", stroke: "#fff1a4", strokeThickness: 2 }).setOrigin(0.5);
    restartButton.on("pointerover", () => restartButton.setFillStyle(0xffd85b));
    restartButton.on("pointerout", () => restartButton.setFillStyle(0xf0bd3a));
    restartButton.on("pointerdown", () => this.scene.restart());
    panel.add([restartButton, restartText]);
    this.tweens.add({ targets: panel, alpha: 1, scale: 1, duration: 180, ease: "Back.Out" });
  }
  private resetRunState() {
    this.distance = 0;
    this.coinsCollected = 0;
    this.speed = 205;
    this.spawnIn = 900;
    this.coinSpawnIn = 1450;
    this.gameOver = false;
    this.floorLines = [];
  }
  private drawWorld() {
    this.cameras.main.setBackgroundColor("#152d29"); this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "env-background").setDisplaySize(GAME_WIDTH, GAME_HEIGHT).setDepth(-10);
    const g = this.add.graphics(); g.fillStyle(0x0e1a19, 0.32).fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT); g.fillStyle(0x6c6848, 0.82).fillTriangle(180, 95, 780, 95, GAME_WIDTH, GAME_HEIGHT).fillTriangle(180, 95, GAME_WIDTH, GAME_HEIGHT, 0, GAME_HEIGHT);
    this.floor = this.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT - 125, GAME_WIDTH, 290, "env-floor").setDepth(0).setAlpha(0.92);
    this.add.image(80, 210, "env-wall").setDisplaySize(105, 300).setDepth(2).setAlpha(0.86); this.add.image(GAME_WIDTH - 80, 210, "env-wall").setDisplaySize(105, 300).setDepth(2).setAlpha(0.86);
    this.add.image(96, 138, "env-torch").setDisplaySize(42, 132).setDepth(4); this.add.image(GAME_WIDTH - 96, 138, "env-torch").setDisplaySize(42, 132).setDepth(4);
    this.add.image(155, 245, "env-palm").setDisplaySize(96, 180).setDepth(3).setAlpha(0.92); this.add.image(GAME_WIDTH - 155, 245, "env-palm").setDisplaySize(96, 180).setDepth(3).setAlpha(0.92); this.add.image(GAME_WIDTH / 2, 150, "env-temple").setDisplaySize(150, 202).setDepth(1).setAlpha(0.88);
    [0, 1, 2].forEach((lane) => g.lineStyle(2, 0xb3a773, 0.35).lineBetween(GAME_WIDTH / 2, 92, LANES[lane], GAME_HEIGHT)); for (let y = 150; y < GAME_HEIGHT; y += 78) this.floorLines.push(this.add.line(GAME_WIDTH / 2, y, 185, 0, 775, 0, 0xb8ab72, 0.24).setLineWidth(2));
  }
  private createAnimations() { if (!this.anims.exists("banana-run")) this.anims.create({ key: "banana-run", frames: [{ key: "player-run1" }, { key: "player-run2" }, { key: "player-run3" }], frameRate: 10, repeat: -1 }); }
  private createAudio() {
    this.backgroundMusic = this.sound.add(AUDIO_CONFIG.background.key, { loop: true, volume: AUDIO_CONFIG.background.volume });
    this.deathSound = this.sound.add(AUDIO_CONFIG.death.key, { loop: false, volume: AUDIO_CONFIG.death.volume, rate: AUDIO_CONFIG.death.rate });
    (Object.keys(SFX_CONFIG) as Array<keyof typeof SFX_CONFIG>).forEach((name) => {
      const effect = SFX_CONFIG[name];
      this.sfx[name] = this.sound.add(effect.key, { loop: false, volume: effect.volume });
    });
    const startMusic = () => this.startBackgroundMusic();
    this.input.once("pointerdown", startMusic);
    this.input.keyboard?.once("keydown", startMusic);
    this.sound.once("unlocked", startMusic);
    this.startBackgroundMusic();
  }
  private startBackgroundMusic() {
    if (this.gameOver || this.sound.locked || this.backgroundMusic?.isPlaying) return;
    this.backgroundMusic?.play();
  }
  private destroyAudio() {
    this.backgroundMusic?.stop(); this.backgroundMusic?.destroy(); this.backgroundMusic = undefined;
    this.deathSound?.stop(); this.deathSound?.destroy(); this.deathSound = undefined;
    Object.values(this.sfx).forEach((sound) => { sound?.stop(); sound?.destroy(); }); this.sfx = {};
    this.events.off("player:jump", this.playJump, this); this.events.off("player:land", this.playLand, this); this.events.off("player:lane-change", this.playWhoosh, this);
    this.events.off("item:coin", this.playCoin, this); this.events.off("item:powerup", this.playPowerup, this); this.events.off("powerup:active", this.playPowerupActive, this);
  }
  private playSfx(name: keyof typeof SFX_CONFIG) { const sound = this.sfx[name]; if (sound && !sound.isPlaying) sound.play(); }
  private playJump() { this.playSfx("jump"); }
  private playLand() { this.playSfx("land"); }
  private playWhoosh() { this.playSfx("whoosh"); }
  private playCoin() { this.playSfx("coin"); }
  private playPowerup() { this.playSfx("powerup"); }
  private playPowerupActive() { this.playSfx("powerupActive"); }
}

export const AUDIO_CONFIG = {
  background: {
    key: "pazzham-background",
    path: "/assets/audio/background.mp3",
    volume: 0.45,
  },
  death: {
    key: "pazzham-death",
    path: "/assets/audio/death.mp3",
    volume: 0.9,
    rate: 1.15,
  },
} as const;

export const SFX_CONFIG = {
  jump: { key: "pazzham-jump", path: "/assets/audio/jump.mp3", volume: 0.65 },
  land: { key: "pazzham-land", path: "/assets/audio/land.mp3", volume: 0.55 },
  coin: { key: "pazzham-coin", path: "/assets/audio/coin.mp3", volume: 0.75 },
  hit: { key: "pazzham-hit", path: "/assets/audio/hit.mp3", volume: 0.85 },
  powerup: { key: "pazzham-powerup", path: "/assets/audio/powerup.mp3", volume: 0.8 },
  powerupActive: { key: "pazzham-powerup-active", path: "/assets/audio/powerup_active.mp3", volume: 0.9 },
  whoosh: { key: "pazzham-whoosh", path: "/assets/audio/whoosh.mp3", volume: 0.5 },
} as const;

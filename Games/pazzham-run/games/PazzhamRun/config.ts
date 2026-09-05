export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;
export const LANES = [GAME_WIDTH * 0.29, GAME_WIDTH * 0.5, GAME_WIDTH * 0.71];
export const PLAYER_Y = GAME_HEIGHT - 105;
export const RUN_THRESHOLD = 200;

export type RunResult = {
  score: number;
  distance: number;
  coins: number;
  passedThreshold: boolean;
};

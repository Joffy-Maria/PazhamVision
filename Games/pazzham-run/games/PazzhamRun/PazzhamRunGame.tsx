"use client";

import { useEffect, useRef } from "react";
import { GAME_HEIGHT, GAME_WIDTH, type RunResult } from "./config";

type PazzhamRunGameProps = {
  onRunComplete?: (result: RunResult) => void;
};

export function PazzhamRunGame({ onRunComplete }: PazzhamRunGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onRunCompleteRef = useRef(onRunComplete);
  onRunCompleteRef.current = onRunComplete;

  useEffect(() => {
    let game: import("phaser").Game | undefined;
    let cancelled = false;
    void import("phaser").then(async (Phaser) => {
      if (cancelled || !containerRef.current) return;
      const { GameScene } = await import("./scenes/GameScene");
      if (cancelled || !containerRef.current) return;
      game = new Phaser.Game({ type: Phaser.AUTO, parent: containerRef.current, width: GAME_WIDTH, height: GAME_HEIGHT, pixelArt: true, antialias: false, backgroundColor: "#152d29", physics: { default: "arcade", arcade: { gravity: { x: 0, y: 1050 }, debug: false } }, scene: [new GameScene((result) => onRunCompleteRef.current?.(result))], scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH } });
    });
    return () => { cancelled = true; game?.destroy(true); };
  }, []);
  return <main className="pazzham-page"><div className="pazzham-frame"><div ref={containerRef} className="pazzham-canvas" /><p className="pazzham-help">← / A &nbsp; switch lane &nbsp; • &nbsp; → / D &nbsp; switch lane &nbsp; • &nbsp; SPACE / ↑ &nbsp; jump</p></div></main>;
}

"use client";

import { PazzhamRunGame } from "@/games/PazzhamRun/PazzhamRunGame";

function postRunComplete(result: { score: number; distance: number; coins: number; passedThreshold: boolean }) {
  if (window.parent === window) return;
  const parentOrigin = new URLSearchParams(window.location.search).get("parentOrigin");
  if (!parentOrigin) return;

  try {
    window.parent.postMessage({ type: "PAZZHAM_RUN_COMPLETE", ...result }, new URL(parentOrigin).origin);
  } catch {
    // A malformed parent origin means this standalone game simply has no parent to notify.
  }
}

export default function Home() {
  return <PazzhamRunGame onRunComplete={postRunComplete} />;
}

"use client";

import { useState } from "react";

import { PlaygroundState } from "@/lib/types";
import { toShareUrl } from "@/lib/url/playground-query";

export function ShareLinkButton({ state }: { state: PlaygroundState }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const shareUrl = toShareUrl(
      state,
      window.location.origin,
      window.location.pathname,
    );

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="action-button" onClick={handleCopy} type="button">
      {copied ? "Copied link" : "Copy share link"}
    </button>
  );
}

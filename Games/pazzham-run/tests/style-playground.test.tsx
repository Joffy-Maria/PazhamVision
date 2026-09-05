import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { StylePlayground } from "@/components/playground/style-playground";
import { parsePlaygroundState } from "@/lib/url/playground-query";

describe("StylePlayground", () => {
  it("switches style packs and keeps the url in sync", async () => {
    window.history.replaceState({}, "", "/");

    render(
      <StylePlayground
        initialState={parsePlaygroundState(new URLSearchParams(window.location.search))}
      />,
    );

    await userEvent.click(screen.getByTestId("style-button-maximalism"));

    await waitFor(() =>
      expect(screen.getByTestId("theme-root")).toHaveAttribute(
        "data-style",
        "maximalism",
      ),
    );

    const borderSlider = screen.getByTestId("slider-border");
    fireEvent.change(borderSlider, { target: { value: "88" } });

    await waitFor(() => {
      expect(window.location.search).toContain("style=maximalism");
      expect(window.location.search).toContain("border=88");
    });
  });

  it("renders the passed url state on first paint", () => {
    const initialState = parsePlaygroundState(
      new URLSearchParams(
        "?style=liquid-glass-inspired&tab=forms&motion=44&depth=22&border=33&radius=66&density=55&glass=91",
      ),
    );

    render(<StylePlayground initialState={initialState} />);

    expect(screen.getByTestId("theme-root")).toHaveAttribute(
      "data-style",
      "liquid-glass-inspired",
    );
    expect(
      screen.getByText("Build a style lab that feels composed, collectible, and alive."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("slider-glass")).toHaveValue("91");
  });
});

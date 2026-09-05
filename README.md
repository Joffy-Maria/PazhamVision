<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# PazhamVision 🎯

## Basic Details

### Team Name: Team Name

### Team Members
- Team Lead: Joffy Maria Pius - Viswajyothi College of Engineering and Technology
- Member 2: Sebin Geo - Viswajyothi College of Engineering and Technology

### Project Description

PazhamVision is a fun, interactive banana-themed experience that combines a calculator with browser-based games.

The project turns a simple calculation into a challenge: users calculate a value, complete the Pazham Ninja challenge, and then survive Pazzham Run before the hidden calculation result is finally revealed.

## The Problem (that doesn't exist)

People can calculate numbers instantly.

But can they earn the right to see the answer by slicing bananas and surviving an endless jungle run?

We decided this was an extremely serious problem.

## The Solution (that nobody asked for)
Demo Link -[https://pazham-vision.vercel.app/]
PazhamVision makes calculations unnecessarily difficult in the best possible way.

First, the user performs a calculation. The result is hidden. The user then has to complete a Banana/Pazham Ninja challenge followed by Pazzham Run.

Only after successfully completing both games is the original calculation result revealed.

Because apparently knowing the answer wasn't enough.

## Technical Details

### Technologies/Components Used

For Software:
- HTML
- CSS
- JavaScript
- TypeScript
- React
- Next.js
- Phaser
- HTML5 Canvas
- Vercel
- Git & GitHub

# Implementation

## For Software

PazhamVision is structured as a main web application combined with a standalone Pazzham Run game.

The main application handles:

- Calculator functionality
- Expression parsing
- Calculation result storage
- Pazham Ninja game
- Game progression
- Overall experience flow
- Final result reveal

Pazzham Run is implemented as a standalone Next.js application using React, TypeScript and Phaser.

The two applications communicate through an iframe and `window.postMessage`.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/OrdinalHaze/PazhamVision.git
cd PazhamVision
```

## Run Commands

### Main PazhamVision Application

Open the project root:

```bash
cd PazhamVision
```
### Screenshots
<img width="1920" height="1140" alt="Screenshot 2026-09-06 022829" src="https://github.com/user-attachments/assets/c591fbc7-9118-479d-82fe-378fe7a0a3e4" />
Figure 1. Pazham Calc – Banana-themed calculator interface
The Pazham Calc game presents an interactive calculator interface with arithmetic operations, a pixel-art banana-themed background, and a retro gaming aesthetic.
<img width="1920" height="1140" alt="Screenshot 2026-09-06 022836" src="https://github.com/user-attachments/assets/fd3660f9-d31f-44c3-99b1-f283f0d44f96" />
Figure 2. Pazham Ninja – Interactive banana ninja game
The Pazham Ninja game features a pixel-art ninja character navigating a forest environment, collecting bananas while tracking the player's score and health.
<img width="1920" height="1140" alt="image" src="https://github.com/user-attachments/assets/72021838-28df-4697-9f79-a5e0d32f3be8" />
Figure 3. Pazham Run – Endless runner mini-game
The Pazham Run game challenges the player to navigate an ancient temple environment, switch lanes, jump over obstacles, and achieve the target distance to progress.

### Architectural Flow



```markdown
## Architectural Flow

```text
┌──────────────────────┐
│      Calculator      │
│  Enter Expression    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Calculate & Store   │
│   Result Privately   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Pazham Ninja     │
│  Reach Score = 20    │
└──────────┬───────────┘
           │
           │ Passed
           ▼
┌──────────────────────┐
│     Pazzham Run      │
│   Next.js + Phaser   │
└──────────┬───────────┘
           │
           │ Passed
           │
           │ postMessage()
           ▼
┌──────────────────────┐
│   Main Application   │
│ Receives Completion  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Reveal Original    │
│ Calculator Result    │
└──────────────────────┘

```bash
git clone https://github.com/OrdinalHaze/PazhamVision.git
cd PazhamVision
